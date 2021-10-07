import http from "../http-common";

class TutorialDataService {

  constructor(props) {
    
    this.shipments = [];
  }
  getAll() {
    //return http.get("/tutorials");
    if (this.shipments.length == 0) this.shipments = http.get("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0");

    return this.shipments;
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(orderNo) {
    //return http.delete(`/tutorials/${id}`);
    /*this.shipments.forEach((shipment, index) => {
      if (shipment.orderNo == orderNo) {
        this.shipments.splice(index, 1);
      }
    })
    return this.shipments;
    */
   return null; 
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();