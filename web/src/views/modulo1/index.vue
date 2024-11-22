<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>       
        <div class="q-pa-md">
          <q-table
          color="primary"
      card-class="bg-amber-5 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
            flat
            bordered
            ref="tableRef"
            title="Modulo 1 Modificado"
            :rows="state.tableData"
            :columns="columns"
            row-key="state.tableData[0]"
            :loading="loading"
            :filter="state.blurry"
            binary-state-sort
          >
          <!--busqueda-->
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="state.blurry" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" @click="getModulo1TableFun" />
                </template>
              </q-input>
            </template>
      <!--CRUD-->
    <!--  <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="onEdit(props.row)" fab-mini dense square outline icon="mode_edit" color="primary" aria-label="Edit" class="q-mr-sm" />
          <q-btn @click="onDelete(props.row)" fab-mini dense square outline icon="delete" color="negative" aria-label="Delete" />
        </q-td>
      </template>
      -->
          </q-table>
          <pagination v-model:current="state.current" 
	 v-model:size="state.size" v-model:total="state.total" 
	 @get-list="getModulo1TableFun"></pagination>
    
        </div>
      </q-page-container>
    </q-layout>
  </template>
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import {  getModulo1Table } from '../../api/modulo1/modulo1';
  import { errorMsg } from '../../utils/message';
  import { date } from 'quasar';
  import Pagination from "../../components/Pagination.vue";


  const state = reactive({
    blurry: '',
    tableData: [],
    current: 1,
    size: 10,
    total: 0
  });
  

  const columns = [
    { name: 'idpedido', 
    required: true, 
    label: 'Mi Id de  Pedido', 
    align: 'center', 
    field: 'idpedido', 
    sortable: true },

    { name: 'Fecha de pedido', 
    required: true, 
    label: 'Fecha de pedido', 
    align: 'left', 
    field: 'fechapedido', 
    sortable: true, format: val => date.formatDate(val, 'DD-MM-YYYY')   },

    { 
      name: 'fechaenvio', 
      required: true, 
      label: 'fechaenvio', 
      align: 'left', 
      field:'fechaenvio', 
      sortable: true, 
      format: val => date.formatDate(val, 'DD-MM-YYYY')  
    },
    { name: 'nombrecompania', required: true, label: 'Nombre de \la Compañia', align: 'left', field: 'nombrecompania', sortable: true },
    { name: 'importeventas', required: true, label: 'importeventas', align: 'left', field: 'importeventas', sortable: true },
    /*{name: 'actions', label: 'Actions', align: 'center', field: 'actions', sortable: false,},*/
  ];
  const dialogVisible = ref(false)
  const loading = ref(false);
  const pagination = ref({
    sortBy: 'nombre',
    descending: false,
    page: 1,
    rowsPerPage: 10,
  });
  
  const getModulo1TableFun = () => {
    loading.value = true;
    const params = {
      // texto a buscar
      blurry: state.blurry,
      // tamaño 
      size: state.size,
      // Usa la página actual de la paginación
      currentPage: state.current
    };
  
    getModulo1Table(params)
      .then((res) => {
        loading.value = false;
        if (res.success) {
          state.tableData = res.data.records;
          state.total = res.data.total;
        } else {
          errorMsg(res.msg);
        }
      })
      .catch(() => {
        loading.value = false;
      });
  };
  
  
  onMounted(() => {
    getModulo1TableFun();
    console.log('estado modulo1');
    console.log(state);
  });
  
  </script>
  