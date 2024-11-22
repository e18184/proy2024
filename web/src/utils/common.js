import {useStore} from "../store";
/**
 * Restablecer elogios
 * @param ref
 */

export function resetForm(ref){
    if (ref && typeof ref.resetFields === 'function') {
        ref.resetFields();
      } else {
        console.error('La referencia es inválida o no tiene el método resetFields:', ref);
      }
}

/**
 * Determina si tienes permiso
 * @param per
 * @returns {boolean}
 */
export function hasPer(per){
    const store = useStore()
    const permission = store.permission
    return permission.indexOf(per) > -1
}