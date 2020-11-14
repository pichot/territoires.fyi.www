<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import centroid from "@turf/centroid";
import hexagoneTopo from '~/static/data/france.json'

export default {
  props: {
    highlightGeojson: Object,
    highlightCentroid: Object
  },
  mounted() {
    this.generateMap();
  },
  data() {
    return {
      hw: 450,
    }
  },
  methods: {
    generateMap() {
      const w = this.hw;
      const h = this.hw;
      const scale = 2500 * (this.hw / 500);
      const center = [2.454071, 46.279229]
      const projection = d3.geoConicConformal()
        .center(center)
        .scale(scale)
        .translate([w / 2, h / 2]);

      const svg = d3
        .select("#map")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      svg.append("g").selectAll("path")
        .data(topojson.feature(hexagoneTopo, hexagoneTopo.objects.france).features)
        .enter()
        .append("path")
        .attr("d", this.pathWith(projection))
        .attr("class", "hexagone")

      if (this.highlightCentroid) {
        const latLng = centroid(this.highlightCentroid).geometry.coordinates

        svg.selectAll("circle")
          // .data([])
          .data([latLng])
          .enter()
          .append("circle")
          .attr("cx", function (d) { return projection(d)[0] })
          .attr("cy", function (d) { return projection(d)[1] })
          .attr("r", "0.5rem")
      }

      if (this.highlightGeojson) {
        svg.append("g").selectAll("path")
          .data([this.highlightGeojson])
          .enter()
          .append("path")
          .attr("d", this.pathWith(projection))
          .attr("class", "collectivite")
      }
    },

    pathWith(projection) {
      const path = d3.geoPath();
      path.projection(projection)
      return path
    }
  }
}
</script>

<style lang="scss">
.commune {
  fill: black;
}

.collectivite {
  fill: black;

  // &:hover {
  //   // fill: black;
  //   cursor: "pointer";
  //   stroke: white;
  // }
}

.hexagone {
  fill: #cbd5e0;
}
</style>
