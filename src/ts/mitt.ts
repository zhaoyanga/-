import mitt from 'mitt'

export type validateFunc = () => boolean | void
type Events = {
  'form-item-created': validateFunc
  'clear': validateFunc
}

const emitter = mitt<Events>()

export default emitter
