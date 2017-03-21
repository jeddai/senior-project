(function () {

    angular.module('titanic')
        .controller('DataController', dataController);

    function dataController($scope, $http) {
        var vm = this;

        vm.data = null;
        vm.groupings = ['pclass'];
        vm.getNewData = getNewData;
        vm.toggle = toggle;
        vm.isPresent = isPresent;

        var svg = d3.select('svg'),
            width = +svg.attr('width'),
            height = +svg.attr('height'),
            transform = d3.zoomIdentity;

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        setupD3();
        function getNewData() {
            $http.post('/data/data.json', vm.groupings)
                .then(function (res) {
                    vm.data = res.data;
                    setupD3(res.data);
                });
        }

        function relink() {
            $http.post('/data/relink', {
                nodes : vm.data.nodes,
                matchers : vm.groupings
            })
                .then(function(res) {
                    vm.data = res.data;
                    forceDirectedGraph();
                });
        }

        function toggle(group) {
            if(isPresent(group)) {
                vm.groupings = vm.groupings.filter(function(arrGroup) {
                    return arrGroup != group;
                });
            } else {
                vm.groupings.push(group);
            }
        }

        function isPresent(group) {
            return vm.groupings.includes(group);
        }

        function setupD3() {
            if(!vm.data) {
                d3.json('/data/data.json', function(err, graph) {
                    if (err) throw err;
                    vm.data = graph;
                    forceDirectedGraph();
                });
            } else {
                forceDirectedGraph();
            }
        }

        function forceDirectedGraph() {
            if(!vm.data) { return false; }
            svg.html('');
            var simulation = d3.forceSimulation()
                .force('link', d3.forceLink().id(function(d) { return d.id; }))
                .force('charge', d3.forceManyBody())
                .force('center', d3.forceCenter(width / 2, height / 2));

            var link = svg.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(vm.data.links)
                .enter().append('line')
                .attr('stroke-width', function(d) { return Math.sqrt(d.value); });

            var node = svg.append('g')
                .attr('class', 'nodes')
                .selectAll('circle')
                .data(vm.data.nodes)
                .enter().append('circle')
                .attr('r', 5)
                .attr('fill', function(d) { return color(d.pclass); })
                .on('click', function(d) {
                    $scope.$apply(function() {
                        var index = vm.data.nodes.indexOf(d);
                        if(index > -1) {
                            vm.data.nodes.splice(index, 1);
                        }
                        relink();
                    });
                })
                .on('mouseover', function(d) {
                    $scope.$apply(function() {
                        vm.highlighted = d;
                    });
                })
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

            svg.call(d3.zoom()
                .scaleExtent([1 / 2, 8])
                .on("zoom", zoomed));

            node.append('title')
                .text(function(d) { return d.name; });

            simulation
                .nodes(vm.data.nodes)
                .on('tick', ticked);

            simulation.force('link')
                .links(vm.data.links);

            function ticked() {
                link
                    .attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });

                node
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });
            }

            function zoomed() {
                link.attr('transform', d3.event.transform);
                node.attr('transform', d3.event.transform);
            }

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        }
    }
})();
