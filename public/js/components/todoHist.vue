<script>
  const axios = require('axios');
  const moment = require('moment');
  require('moment/locale/ja');
  module.exports = {
    props: ['title', 'description', 'id', 'created_at', 'deleted_at', 'completed_at'],
    filters: {
      moment(date){
        moment.locale('ja');
        return moment(date).calendar();
      }
    }
  }
</script>

<template lang="pug">
  div.container.border-bottom
    div.row
      div.col
        p {{title}}
        p(v-if="description").description {{description}}
      div(v-if="deleted_at").col-md-auto
        p.date 🗑{{deleted_at | moment}}
      div(v-if="completed_at").col-md-auto
        p.date ✅{{completed_at | moment}}
      div.col-md-auto
        p.date 🎉{{created_at | moment}}
</template>

<style scoped>
</style>
