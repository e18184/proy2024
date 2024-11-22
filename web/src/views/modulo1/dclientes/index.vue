<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="q-pa-md">
        <q-table
        class="my-sticky-header-table"  
        flat
          bordered
          ref="tableRef"
          title="Detalle de Clientes"
          :rows="state.tableData"
          :columns="columns"
          row-key="idcliente"
          :loading="loading"
          :filter="state.blurry"
          binary-state-sort
          :visible-columns="visibleColumns"
        >
        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="state.blurry" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" @click="getModulo1DClientesTableFun" />
              </template>
            </q-input>
          </template>  
        <template v-slot:top-left>
            <q-btn icon="add" @click="onEdit">Nuevo</q-btn>
            <q-space />
          </template>
          
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                v-model:editar-visible="editarVisible" 
                @click="onEdit(props.row)" fab-mini dense square outline icon="mode_edit" color="primary"
                aria-label="Editar"
                :cliente-obj="state.clienteObj"
                class="q-mr-sm"
              />
              <q-btn
              v-model:pedido-visible="pedidoVisible"
                @click="onPedidos(props.row.idcliente)" 
                fab-mini dense square outline icon="table_view" color="negative"
                :cliente-id="state.clienteId"
                aria-label="Detalle"
              />
            </q-td>
          </template>
        </q-table>
      <pagination 
        v-model:current="state.current" 
	      v-model:size="state.size" 
        v-model:total="state.total" 
	      @get-list="getModulo1DClientesTableFun">
      </pagination>
      </div>
      <!-- Componente de pedidos -->
      <pedidoDclientes
  v-model:pedido-visible="pedidoVisible"
  :cliente-id="state.clienteId"
/>
            <!-- Componente de edición -->
      <editDClientes
 v-model:dialog-visible="editarVisible"
  :cliente-obj="state.clienteObj"
/>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import pedidoDclientes from './pedidoDclientes.vue';
import editDClientes from './editDClientes.vue';
import { ref, reactive, onMounted } from 'vue';
import { getModulo1DClientesTable, delModulo1 } from '../../../api/modulo1/modulo1';
import { errorMsg } from '../../../utils/message';
import Pagination from "../../../components/Pagination.vue";

const state = reactive({
  blurry: '',
  tableData: [],
  current: 1,
  size: 10,
  total: 0,
  clienteId: null,
  clienteObj: {},
})


const pedidoVisible = ref(false);
const editarVisible = ref(false);


const columns = [
  { name: 'idcliente', label: 'ID Cliente', align: 'center', field: 'idcliente', sortable: true },
  { name: 'compania', label: 'Compañia', align: 'left', field: 'compania', sortable: true },
  { name: 'apellidos', label: 'Apellidos', align: 'left', field: 'apellidos', sortable: true },
  { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'email', label: 'Correo', align: 'left', field: 'email', sortable: true },
  { name: 'cargo', label: 'Cargo', align: 'left', field: 'cargo', sortable: true },
  { name: 'telefonoTrabajo', label: 'Tel. de Trabajo', align: 'left', field: 'telefonoTrabajo', sortable: true },
  { name: 'telefonoParticular', label: 'Tel. Particular', align: 'left', field: 'telefonoParticular', sortable: true },
  { name: 'telefonoMovil', label: 'Tel. Movil', align: 'left', field: 'telefonoMovil', sortable: true },
  { name: 'numeroFax', label: 'Numero Fax', align: 'left', field: 'numeroFax', sortable: true },
  { name: 'direccion', label: 'Direccion', align: 'left', field: 'direccion', sortable: true },
  { name: 'ciudad', label: 'Ciudad', align: 'left', field: 'ciudad', sortable: true },
  { name: 'estadoProvincia', label: 'Estado \n Provincia', align: 'left', field: 'estadoProvincia', sortable: true },
  { name: 'codigoPostal', label: 'Cod Postal', align: 'left', field: 'codigoPostal', sortable: true },
  { name: 'paisRegion', label: 'Pais Region', align: 'left', field: 'paisregion', sortable: true },
  { name: 'paginaWeb', label: 'Pagina Web', align: 'left', field: 'paginaWeb', sortable: true },
  { name: 'notas', label: 'Notas', align: 'left', field: 'notas', sortable: true },
  { name: 'datosAbjuntos', label: 'Datos Abjuntos', align: 'left', field: 'datosabjuntos', sortable: true },
  { name: 'actions', label: 'Acciones', align: 'center', field: 'actions', sortable: false },
];

const visibleColumns = ref(['idcliente', 'nombre','compania','cargo', 'actions']);
const loading = ref(false);

const pagination = ref({ sortBy: 'nombre', descending: false, page: 1, rowsPerPage: 10 });


const getModulo1DClientesTableFun = () => {
    loading.value = true;
    const params = {
      blurry: state.blurry,
      size: state.size,
      currentPage: state.current 
    };
  
  getModulo1DClientesTable(params)
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
      errorMsg('Error al cargar los datos');
    });
};

const onEdit = (row) => {
  editarVisible.value = true;
  state.clienteObj = row.idcliente ? row: {}
};

const onPedidos = (id) => {
  console.log('id')
  console.log(id)
  if (!id) {
  errorMsg('Fila inválida o ID de cliente no encontrado:',id)
  return; }
  pedidoVisible.value = true; // Luego abre el diálogo
  state.clienteId = id; // Asegúrate de establecer el cliente antes
};

  
onMounted(() => {
  getModulo1DClientesTableFun();
});
</script>
<style lang="scss">
@import "@/styles/quasar.variables.scss"; // Usando sintaxis SCSS

.my-sticky-header-table {
  /* height or max-height is important */
  height: 500px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #00b4ff;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 100px;
  }
}
</style>
