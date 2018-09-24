<template>
  <div class="row mt-2">
    <div class="col-lg-3">

      <div class="card">
        <!-- <li> -->
          <!-- <label>Render as  </label> -->
          <!-- <input type="radio" :value='false' v-model='canvas' /> -->
          <!-- <label>SVG</label> -->
          <!-- <input type="radio" :value='true' v-model='canvas' /> -->
          <!-- <label>Canvas</label> -->
        <!-- </li> -->
        <div class="card-body pb-0">
          <p class="lead mb-1">Select a House</p>
          <div class='form-group'>
            <input class='form-control' type="text" v-model='houseQuery' placeholder='Filter Houses'>
          </div>
          <hr>
        </div>

        <ul class="list-group list-group-flush">
          <li :class="h['@id'] === house['@id'] ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'" v-for="h in houses" @click="house = h">
            {{ h.name }}
          </li>
        </ul>
      </div>

    </div>

    <div class="col-lg-9 text-center">
      <div class='form-group graph-controls px-2 d-flex align-items-center'>
        <label class='mb-0 mr-2'>Force</label>
        <input class='form-control' type="range" min="1" max="3000" v-model='force' />
        <!-- {{ options.force }} -->
      </div>

      <p class="lead mt-4 house-header">{{ house.name }}</p>
      <d3-network ref='net'
      :net-nodes="graphData.nodes"
      :net-links="graphData.links"
      :options="options" v-if="graphData.nodes.length"/>

      <template v-else>
        <hr>
        <p class="lead mt-4">
          <i class="fa fa-lg fa-exclamation-circle text-warning"></i>
        </p>
        <p class="lead mt-4">{{ house.name }} has no allegiances!</p>
        <small class="text-muted">(maybe they went the way of House Reyne of Castamere...)</small>
        <p class="lead mt-4">Please select another house</p>
      </template>
    </div>
  </div>
</template>

<script>
import graph from '../graph'
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
      houseQuery: '',
      house: graph['@graph'].find(n => n['@id'] === 'http://asoiaf.org/house/362/house_stark_of_winterfell')
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

          // console.log(related)
        }

        if (!node.affiliation) return

        node.affiliation.forEach((a) => {
          related = nodes.find(n => n.id === a['@id'])

          if (!related) {
            related = graph['@graph'].find(n => n['@id'] === a['@id'])
            nodes.push({ id: related['@id'], name: related.name, _color: 'blue', _size: 20 })
          }

          links.push({ sid: node['@id'], tid: a['@id'], _color:'red', name: 'Allegiance' })

          // console.log(related)
        })

        related = null

      // })
      })

      return { nodes, links }
    },
    houses () {
      return graph['@graph'].filter((h)=> {
        // return (h['@type'] === 'foaf:Organization' && h['name'].toLowerCase().includes(this.houseQuery))
        if (!this.houseQuery) {
          return (h['@type'] === 'foaf:Organization')
        } else {
          return (h['@type'] === 'foaf:Organization' && h['name'].toLowerCase().includes(this.houseQuery.toLowerCase()))
        }
      })
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

.graph-controls {
  position:absolute;
  right: 0;
}

p.house-header {
  position: fixed;
}

ul.list-group {
  /*position: absolute;*/
  z-index: 100;
  height: 30rem;
  overflow-y: scroll;
}

</style>
