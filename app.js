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
            //{id: 0, name: 'Steak Dinner', calories: 800},
            //{id: 1, name: 'Cookie', calories: 300},
            //{id: 2, name: 'Eggs', calories: 200},
        ],
        currentItem: null,
        totalCalories: 0
    }

    //public methods
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            
            let ID;
            //create ID 
            if(data.items.length > 0){
                ID = data.items[data.items.length-1].id + 1;
            }else{
                ID = 0;
            }

            //calories to number
            calories = parseInt(calories);

            //create new item
            newItem = new Item(ID, name, calories);

            //push new item to data
            data.items.push(newItem);

            return newItem;
        },

        getTotalCalories: function(){
            let total = 0;
            //loop thru items and add cals
            data.items.forEach(function(item){
                total += item.calories;

            });
            //set total cal in data structure
            data.totalCalories = total;

            return data.totalCalories;

        },

        logData: function(){
            return data;
        }
    }
    
    
})();



//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    //public methods
    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            });

            //insert list items in UI
            document.querySelector(UISelectors.itemList).innerHTML=html;
        },

        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function(item){
            //show list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create li element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add id 
            li.id = `item-${item.id}`;
            //add html
            li.innerHTML = ` <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },

        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
 
        getSelectors: function(){
            return UISelectors;
        }
    } 
})();



//App Controller
const App = (function(ItemCtrl, UICtrl){

    //load event listeners
    const loadEventListeners = function(){
        //get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    //add items submit
    const itemAddSubmit = function(e){
        //get form input from UI controller
        const input = UICtrl.getItemInput();

        //check inputs
        if(input.name !== '' && input.calories !== ''){
           //add the item
           const newItem = ItemCtrl.addItem(input.name, input.calories);
           UICtrl.addListItem(newItem);
        }else{
            //alert
            alert('Enter missing values');
        }

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearInput();

        e.preventDefault();
    }

    //public methods
    return {
        init: function(){
            //fetch items from data structure
            const items = ItemCtrl.getItems();

            //check for items
            if (items.length === 0 ){
                UICtrl.hideList();
            }else{
                //populate list with items
                UICtrl.populateItemList(items);
            }

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            
            //load event listeners
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);


App.init();