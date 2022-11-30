const map1 = new Map();

//party size NEED TO ATTACH REAL PARTY SIZE
var x = 17;

//(capacity of table, # of tables)
map1.set(8, 2);
map1.set(6, 3);
map1.set(4, 5);
map1.set(2, 8);

//updating available tables
while (x > 0 || x != 0){
    if (x > 8 && map1.get(8) != 0){
        map1.set(8, map1.get(8) - 1);
        x -= 8;
        console.log(x);
        console.log(map1.get(8));

    } else if (x > 6 && map1.get(6) != 0){
        map1.set(6, map1.get(6) - 1);
        x -= 6;
        console.log(x);
        console.log(map1.get(6));

    } else if (x > 4 && map1.get(4) != 0){
        map1.set(4, map1.get(4) - 1);
        x -= 4;
        console.log(x);
        console.log(map1.get(4));

    } else if (x > 0 && map1.get(2) != 0){
        map1.set(2, map1.get(2) - 1);
        x -= 2;
        console.log(x);
        console.log(map1.get(2));

    }
    //NOT ENOUGH SEATS
    else{
        x = 0;
    }

}
console.log(x);

// map1.get(2));

// map1.set(2, 97);

// map1.get(2));

// map1.size);

//map.put(key, map.get(key) - 1);
