import { defineComponent, defineProps, ref, h } from 'vue'
export default defineComponent({
    name: 'Vnode',
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    setup (props) {
        const count = ref(1)
        const show = ref(false)
    // 要配合template使用，和script标签
    // const H1 = h('h1', props.msg)
    // 不可在setup语法糖中使用，需要使用函数包裹 const H1 = () => [h('h1', props.msg), h('div', count.value)]
    // const H1 = [h('h1', props.msg), h('div', count.value)]
    // 在ts文件下使用
        return () => [h('h1', {
            onClick: () => {
                count.value++
                show.value = true
            },
            id: '000',
            style: {
                width: '200px',
                height: '200px',
                marginTop: '20px',
                marginLeft: '185px',
                display: show.value ? 'none' : 'block'
            },
            class: ['out', 'a']
        }, props.msg), h('div', count.value)]
        // ts是无法识别这个语法，需要改文件后缀名，变成tsx,使用变量要使用单{}
        // const a = () => {
        //     count.value++
        // }
        // return () => (
        //     <div>
        //         <h1 onClick={a}>{props.msg}</h1>
        //         <p>{count.value}</p>
        //         h('div',{ 'id': 000 },)
        //     </div>
        // )
    }
})
