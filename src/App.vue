<template>
  <div id="app" class='container-fluid'>
    <div class="row mt-2">
      <div class="col-lg-3">

        <div class="card">
          <div class="card-body">
            <p class='lead'>Graph Of Thrones</p>
            <hr>
            <!-- <li> -->
              <!-- <label>Node size</label> -->
              <!-- <input type="range" min="1" max="100" v-model='nodeSize' /> {{ options.nodeSize }} -->
            <!-- </li> -->
            <div class='form-group'>
              <label>Force</label>
              <input type="range" min="1" max="3000" v-model='force' /> {{ options.force }}
            </div>
            <!-- <li> -->
              <!-- <label>Render as  </label> -->
              <!-- <input type="radio" :value='false' v-model='canvas' /> -->
              <!-- <label>SVG</label> -->
              <!-- <input type="radio" :value='true' v-model='canvas' /> -->
              <!-- <label>Canvas</label> -->
            <!-- </li> -->
            <hr>
            <p class="card-text">Select a House</p>
          </div>

          <ul class="list-group list-group-flush">
            <li :class="h['@id'] === house['@id'] ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'" v-for="h in houses" @click="house = h">
              {{ h.name }}
            </li>
          </ul>
        </div>
        <!-- example control -->
      </div>

      <div class="col-lg-9 text-center">
        <p class="lead mt-4 house-header">{{ house.name }}</p>
        <d3-network ref='net'
        :net-nodes="graphData.nodes"
        :net-links="graphData.links"
        :options="options" v-if="graphData.nodes.length"/>

        <template v-else>
          <hr>
          <p class="lead mt-4">
            <i class="fa fa-lg fa-exclamation"></i>
          </p>
          <p class="lead mt-4">{{ house.name }} has no allegiances</p>
          <p class="lead mt-4">Please select another house</p>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import graph from './graph'
import D3Network from 'vue-d3-network'

export default {
  components: {
    D3Network,
  },
  data() {
    return {
      nodeSize: 20,
      force: 250,
      canvas: false,
      house: graph['@graph'].find(n => n['@id'] === 'http://asoiaf.org/house/229/house_lannister_of_casterly_rock')
    };
  },
  computed: {
    graphData () {
      let nodes = []
      let links = []

      let i = 0
      let node = {}
      let related = null
      if (!this.house) return { nodes, links }

      let matchedNodes = graph['@graph'].filter((n) => {
        if (n['@id'] === this.house['@id']) {
          return true
        } else if (!n.affiliation) {
          return false
        // } else if (n.affiliation.find(a => { a['@id'] === this.house['@id'] })) {
        } else {
          // console.log(n.affiliation)
          related = n.affiliation.find((a) => {
            // console.log(a)
            if (a['@id'] === this.house['@id']) {
              return a
            }
          })
          // console.log(related)
          if (related) {
            console.log('FOUND???')
            return true
          }
        }
        return false
      })

      // console.log(matchedNodes)
      // return { nodes, links }

      matchedNodes.forEach((node) => {
        // node = graph['@graph'][i]

        if (node['@type'] === 'foaf:Organization') {
          // nodes.push({ id: node['@id'], name: node.name, _color: 'blue', _size: 20 })
        } else {
          nodes.push({ id: node['@id'], name: node.name, _color: 'orange', _size: 10 })
        }

        if (node.spouse) {
          related = nodes.find(n => n.id === node.spouse)

          if (!related) {
            related = graph['@graph'].find(n => n['@id'] === node.spouse)
            nodes.push({ id: related['@id'], name: related.name, _color: 'orange', _size: 10 })
          }

          links.push({ sid: node['@id'], tid: node.spouse, _color: 'rebeccapurple', name: 'Spouse' })

          console.log(related)
        }

        if (!node.affiliation) return

        node.affiliation.forEach((a) => {
          related = nodes.find(n => n.id === a['@id'])

          if (!related) {
            related = graph['@graph'].find(n => n['@id'] === a['@id'])
            nodes.push({ id: related['@id'], name: related.name, _color: 'blue', _size: 20 })
          }

          links.push({ sid: node['@id'], tid: a['@id'], _color:'red', name: 'Allegiance' })

          console.log(related)
        })

        related = null

      // })
      })

      return { nodes, links }
    },
    houses () {
      return graph['@graph'].filter(h => h['@type'] === 'foaf:Organization')
    },
    options() {
      return {
        force: this.force,
        // size: { w: 1200, h: 600 },
        // nodeSize: this.nodeSize,
        nodeLabels: true,
        canvas: this.canvas,
        linkWidth: 2,
        nodeLabels: true,
        linkLabels: false,
      };
    },
  },
};

</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>
<style scoped>

body{
  background-color: #f3f3f3;
}

.title{
  position:absolute;
  text-align: center;
  left: 2em;
}

p.house-header {
  position: fixed;
}

ul.list-group {
  /*position: absolute;*/
  z-index: 100;
  height: 300px;
  overflow-y: scroll;
}

</style>
