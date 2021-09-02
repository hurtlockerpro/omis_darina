
console.log('Hello world!') 

let a = 'txt'

//console.log()

let z = true ? '1' : '2'

for (let index = 0; index < 5; index++) {
    const element = index;
    console.log(element)
}

let cars = ["audi", "bmw", true, undefined] // typescript

let cars2 = {
    car:"audi",
    car2:"bmw",
    car3:[
        {
            car:"audi 11"
        },
        {
            car:"audi 12"
        },
    ],
    car4:function(){
        return this.car + " cool car";
    },
    car5:() => {
        return this
    }
}
/*
console.log(typeof cars)
console.log(typeof cars2)
console.log(cars2.car3[1].car)
*/
console.log(cars2.car4())
console.log(cars2.car5())


cars.forEach(function(item, i, arr) {
    console.log('index = ', i, 'data', item, arr)
}) 


