import { create } from 'apisauce'
/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/

const meuIP = 'http://192.168.100.125'
const porta = '3200'
const baseURL = `${meuIP}:${porta}/`

const api = create({ baseURL });

export default api;