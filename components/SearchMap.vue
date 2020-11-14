<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import rewind from "@turf/rewind"
import guadeloupe from "~/static/data/guadeloupe-clean.json"
import departements from '~/static/data/departements.json'

export default {
  mounted() {
    this.generateMap();
  },
  methods: {
    generateMap() {
      const w = 450;
      const h = 450;

      const svg = d3
        .select("#map")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      
      // svg.append("g").selectAll("path")
      //   .data(guadeloupe.features)
      //   .enter()
      //   .append("path")
      //     .attr("d", this.pathWith({
      //       center: [-61.571533,16.254179],
      //       scale: 2600,
      //       h, w,
      //     }))
      //     .attr("class", "collectivite")

      // const path = this.pathWith({
      //   center: [2.454071, 46.279229],
      //   scale: 2600,
      //   h, w,
      // })

      // const hexagone = svg.append("g")
      svg.append("g").selectAll("path")
        .data(departements.features)
        .enter()
        .append("path")
          .attr("d", this.pathWith({
            center: [2.454071, 46.279229],
            scale: 2600,
            h, w,
          }))
          .attr("class", "collectivite")
    },
    pathWith({ center, scale, h, w }) {
      const path = d3.geoPath();
      const projection = d3.geoConicConformal()
        .center(center)
        .scale(scale)
        .translate([w / 2, h / 2]);
      path.projection(projection)
      return path
    }
  }
}
</script>

<style lang="scss">
.collectivite {
  fill: transparent;
  stroke: black;
  stroke-width: "1px";

  &:hover {
    fill: blue;
    cursor: "pointer";
  }
}
</style>
