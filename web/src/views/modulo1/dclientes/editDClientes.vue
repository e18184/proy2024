<template>
  <q-dialog v-model="visible" :title="state.title" :close-on-click-modal="false" @before-show="openFun" >
    <q-card class="myClass">
      <q-card-section>
        <div class="text-h6">{{ state.title }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="submitForm" ref="clienteRef">
          <q-input v-model="state.form.idcliente" label="Id" :disable="true" />  <!-- Campo Id deshabilitado -->
          <q-input v-model="state.form.compania" label="Compañía" />
          <q-input v-model="state.form.apellidos" label="Apellidos" />
          <q-input v-model="state.form.nombre" label="Nombre" />
          <q-input v-model="state.form.correo" label="Correo" />
          <q-input v-model="state.form.cargo" label="Cargo" />
          <q-input v-model="state.form.telefonotrabajo" label="Telefono del Trabajo" />
          <q-input v-model="state.form.telefonoparticular" label="Telefono Particular" />
          <q-input v-model="state.form.telefonomovil" label="Telefono Movil" />
          <q-input v-model="state.form.numerofax" label="Numero fax" />
          <q-input v-model="state.form.direccion" label="Direccion" />
          <q-input v-model="state.form.ciudad" label="Ciudad" />
          <q-input v-model="state.form.estadoprovincia" label="Estado Provincia" />
          <q-input v-model="state.form.cpostal" label="Codigo Postal" />
          <q-input v-model="state.form.pais" label="Pais o Region" />
          <q-input v-model="state.form.web" label="Pagina Web" />
          <q-input v-model="state.form.notas" label="Notas" />
          <q-input v-model="state.form.datosadjuntos" label="Datos Abjuntos" />
          <!-- ...otros campos del formulario... -->
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Reiniciar" color="negative" @click="resetForm(clienteRef)" />
        <q-btn flat label="Guardar" color="primary" @click="submitForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { editCliente } from '../../../api/modulo1/modulo1';
import { ref, reactive, computed, watch } from 'vue';
import { resetForm } from '../../../utils/common';
import { errorMsg, successMsg } from '../../../utils/message';

const props = defineProps({
  dialogVisible : { // Cambia "dialogVisible" a "modelValue"
    type: Boolean,
    required: true,
    default: false
  },
  clienteObj: Object 
});

const emit = defineEmits(['update:dialogVisible', 'get-list']);

const visible = computed({
  get: () => props.dialogVisible,
  set: (val) => emit('update:dialogVisible', val)
});

const isLoading = ref(false);

const state = reactive({
  title: 'Editar Cliente',
  form: {
    idcliente: null,
    compania: '',
    apellidos: '',
    nombre: '',
    correo: '',
    cargo: '',
    telefonotrabajo: '',
    telefonoparticular: '',
    telefonomovil: '',
    numerofax: '',
    direccion: '',
    ciudad: '',
    estadoprovincia: '',
    cpostal: '',
    pais: '',
    web: '',
    notas: '',
    datosadjuntos: ''
  }
});


// guardamos las modificaciones 
const submitForm = () => {
  editCliente(state.form) .then(res => {
    if (res.success) {
      successMsg(res.data)
      visible.value = false
      emit('get-list')
    } else {
      errorMsg(res.msg);
    }
    isLoading.value = false
  })
}
const clienteRef = ref()
const openFun = () => {
  console.log('abrio el formulario Cliente')
  resetForm(clienteRef.value)
  state.title = 'Nuevo'
  isLoading.value = false
  console.log('clienteObj')
  console.log(props.clienteObj)
  if (props.clienteObj.idcliente){
    state.title = 'Editar'
    state.form = props.clienteObj
  }
}

</script>
<style>
.myClass {
  max-width: 1200px;
  width: 100%;
}
</style>
