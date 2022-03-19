import {activeRunId, DAQSchema, sio} from "./stores.js";
import {get} from "../_snowpack/pkg/svelte/store.js";
import {cloneDeep, findIndex} from "../_snowpack/pkg/lodash.js";
export function play() {
  sio.emit("play_start");
}
export function stop() {
  sio.emit("play_stop");
}
export function resetPlayback() {
  sio.emit("play_seek", 0);
}
export function pause() {
  sio.emit("play_pause");
}
export function setFramerate(rate) {
  sio.emit("play_framerate", rate);
}
export function seekTo(time) {
  sio.emit("play_seek", time);
}
export function startStorage(uuid) {
  sio.emit("run_init", uuid);
}
export function stopRunStorage(uuid) {
  sio.emit("run_stop", uuid);
}
export function deleteRun(uuid) {
  sio.emit("run_delete", uuid);
}
export function activateRun(uuid) {
  if (get(activeRunId) !== uuid && uuid != null)
    sio.emit("activate_run", uuid);
}
export function deactivateRun() {
  sio.emit("deactivate_run");
}
export function createModule(typeName) {
  sio.emit("create_module", typeName);
}
export function pushSchema(schema) {
  sio.emit("schema_update", schema);
}
export function applyModuleDefinition(definition) {
  const schema = cloneDeep(get(DAQSchema));
  const i = findIndex(schema.modules, {id: definition.id});
  schema.modules.splice(i, 1, definition);
  pushSchema(schema);
}
export function deleteModule(uuids) {
  const schema = cloneDeep(get(DAQSchema));
  for (const uuid of uuids) {
    const i = findIndex(schema.modules, {id: uuid});
    schema.modules.splice(i, 1);
  }
  pushSchema(schema);
}
export function setRunMetadata(id, meta) {
  sio.emit("set_run_meta", id, meta);
}
