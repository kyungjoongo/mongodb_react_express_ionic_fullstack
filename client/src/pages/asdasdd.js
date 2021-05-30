const array = [
    {
        id: '1',
        contents: "gfhjfhgjfjhgh",
        date: "2021-03-18T07:31:58.313Z",
    },
    {
        id: '2',
        contents: "gfhjfhgjfjhgh",
        date: "2021-03-18T07:31:58.313Z",
    },
    {
        id: '3',
        contents: "gfhjfhgjfjhgh",
        date: "2021-03-18T07:31:58.313Z",
    },

];

let select = '1'

let filterArr=array.filter(item => {
    return select != item.id
})

console.info("temp====>", filterArr);
