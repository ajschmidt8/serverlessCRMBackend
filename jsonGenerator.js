// https://www.json-generator.com/
// customers
[
  "{{repeat(7, 7)}}",
  {
    customer_id: "{{objectId()}}",
    document: "customer_info",
    firstName: "{{firstName()}}",
    lastName: "{{surname()}}",
    email: "{{email()}}",
    phone: '{{phone("xxx-xxx-xxxx")}}',
    address: "{{integer(100, 999)}} {{street()}}",
    city: "{{city()}}",
    state: "{{state()}}",
    zip: "{{integer(10000, 99999)}}"
  }
];

// invoice
[
  "{{repeat(7, 7)}}",
  {
    customer_id: "{{objectId()}}",
    document: "invoice",
    date: "{{integer(1000, 6000)}}",
    amount: "{{float(3000, 7000, 2)}}"
  }
];
