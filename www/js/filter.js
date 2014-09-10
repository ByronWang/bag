angular.module('starter.filter', [])

.filter('level',function(){
    return function(items){
        angular.forEach(items,function(item){
            item = item + '!'
        });
        return items;
    }
});  