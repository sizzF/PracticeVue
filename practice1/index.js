Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
    }
})

var obj = {
    foo: 'bar'
}


var app2= new Vue({
    el: '#app2',
    data: obj,

    created: function () {
        // `this` points to the vm instance
        console.log('data is: ' + obj.foo)
    }
})

var app3 = new Vue({
    el: "#app-3",
        data: {
            msg: '테스트 메세지'
        }



})
