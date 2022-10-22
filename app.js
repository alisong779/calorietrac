//Storage Controller

//Item Controller
const ItemCtrl = (function(){
    //constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //data structure / state
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 800},
            {id: 1, name: 'Cookie', calories: 300},
            {id: 2, name: 'Eggs', calories: 200},
        ],
        currentItem: null,
        totalCalories: 0
    }

    //public methods
    return {
        getItems: function(){
            return data.items;
        }
    }
    return {
        logData: function(){
            return data;
        }
    }
    
})();



//UI Controller
const UICtrl = (function(){

    //public methods
    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories}Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            });

            //insert list items in UI
            document.querySelector('#item-list').innerHTML=html;
        }

    } 
})();



//App Controller
const App = (function(ItemCtrl, UICtrl){

    //public methods
    return {
        init: function(){
            //fetch items from data structure
            const items = ItemCtrl.getItems();

            //populate list with items
            UICtrl.populateItemList(items);
        }
    }
    
})(ItemCtrl, UICtrl);


App.init();