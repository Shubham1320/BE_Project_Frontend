import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput,CSelect,CButton} from '@coreui/react';
import {Label} from 'reactstrap';

class QueryPrice extends Component {

	constructor(props) {
		super(props);

		this.state={

			channelName:this.props.channelName,
        	chaincodeName:this.props.chaincodeName,
        	organization:this.props.organization,
          	orgUserId:this.props.orgUserId,

			assetId: "",
			price: "",
			tradeSalt: "",
			typeOfPrice: ""
		}

		this.onInputchange = this.onInputchange.bind(this);
		this.queryPrice = this.queryPrice.bind(this);
	}

	onInputchange(event) {
    	this.setState({
      		[event.target.name]: event.target.value
    	});
  	}

  	queryPrice() {

  		let data = {
  			channelName: this.state.channelName,
  			chaincodeName: this.state.chaincodeName,
  			organization: this.state.organization,
  			orgUserId: this.state.orgUserId,
  			assetKey: this.state.assetId.trim()

  		} 

  		let price_type = this.state.typeOfPrice == "1"?"sale-price":"bid-price";

  		axios.post(
    	"http://localhost:3001/v1/read-asset/" + price_type, data).then((response) => {

	    	if(response.data.success) {
	    		let result = response.data.result;

	    		console.log(result);

	    		this.setState({

	    			tradeSalt: result.trade_id,
	    			price: result.price

	    		});
	    		
	    	}
	    	else 
	    		alert(response.data.error)		
    
    	}).catch((error) => console.log(error));

  	}

  	render(){
  		
  		return(

  			<CForm>
				<CRow style={{"padding-left":"20px","padding-top":"20px"}}>

					<CCol sm={4} >
						<CInput
							type="search"
        					id="assetId"
        					name="assetId"
        					placeholder="Enter Asset Id . . ."
        					autoComplete="off"
        					value={this.state.assetId}
        					onChange={this.onInputchange}

        				/>
        				
    				</CCol>

    				<CCol sm={3}>
          				<CSelect
          					
          					id="typeOfPrice"
          					name="typeOfPrice"
          					placeholder="Type of price"
          					onChange={this.onInputchange}
          					>

          					<option selected value="" disabled>Type of price</option>
          					<option value="1">Sale Price</option>
          					<option value="2">Bid Price</option> 
          					
          				</CSelect>	
          			</CCol>	

    				<CCol sm={2}>
    					<CButton onClick={this.queryPrice} color="primary">Search	</CButton>	
    				</CCol>	

	    		</CRow>	
    			<hr/>
    			<CRow style={{"padding-left":"20px","padding-top":"5px"}}>
    				<CCol sm={5}>
    					<Label htmlFor="tradeSalt">Trade Salt</Label>
    					<CInput
	        				id="tradeSalt"
	        				name="tradeSalt"
	        				placeholder="Trade Salt"
	        				autoComplete="off"
	        				value={this.state.tradeSalt}
	        				readonly="true"
	        			/>
        			</CCol>

        			<CCol sm={3}>
    					<Label htmlFor="price">Price</Label>
    					<CInput
	        				id="price"
	        				name="price"
	        				placeholder="Price"
	        				autoComplete="off"
	        				value={this.state.price}
	        				readonly="true"
	        			/>
        			</CCol>


    			</CRow>	

    			
    		</CForm>		



  		)
  	}

}

export default QueryPrice;