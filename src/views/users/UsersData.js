import axios from "axios";
import { Component } from "react";

class UsersData extends Component
{
  constructor(props) {
    super(props);
  }
  
}
const usersData = [
  {id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending'},
  {id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
  {id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending'},
  {id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned'}
  ]

export default usersData
