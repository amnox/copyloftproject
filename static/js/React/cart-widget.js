class ParentContainer extends React.Component{
	constructor(props){
		super(props);
		this.holder=this.holder.bind(this);
		this.state=props.data.object;
	}
	holder(){
		return(
	            <div className="panel with-nav-tabs panel-primary">
	            	<NavTabs tabs={this.state.tabs}/>
	            
	            <div className="panel-body">
	                <TabBody body={this.state.body}/>
	            </div>
	        </div>
		);
	}
		render() {
		    return (<this.holder/>);
		 }
	}
class NavTabs extends React.Component{
	constructor(props){
		super(props);
		this.state={
	    		items:props.tabs
	    };
		this.tabs=this.tabs.bind(this);
		this.tabList=this.tabList.bind(this);
		this.tab=this.tab.bind(this);
		this.remove=this.remove.bind(this);
	}
	remove(){
		alert("fuck");
	}
	tab(props){
		return(
			<li className={props.cls}><a href={props.href} data-toggle="tab">{props.name}<img onClick={this.remove}/></a></li>	
		);
	}
	tabList(props){
		const listItems = this.state.items.map((item) =>
		<this.tab cls={item.cls} href={item.href} name={item.name} />
		
		);
		return(<ul className="nav nav-tabs">
			{listItems}
			<li><img className="add-more"/></li>
		</ul>);
	}
	tabs(props){
		return(
			<div className="panel-heading">
                <this.tabList/>
            </div>
		);
	}
	render(){
		return(<this.tabs/>)
	}
}
class TabBody extends React.Component{
	constructor(props){
		super(props);
		this.state={tab_content:props.body};
		this.tab_content=this.tab_content.bind(this);
		this.tab_body=this.tab_body.bind(this);
	}
	tab_body(props){	
		//var classes=classNames({'tab-pane':true,'fade': true});
		const body= this.state.tab_content.map((item) =>
		<div className={item.cls} id={item.id}>{item.name}</div>
		
		);
		return (<div className="tab-content">{body}</div>);
	}
	tab_content(props){
		return(
			   <this.tab_body />
		);
	}
	render(){
		return(<this.tab_content/>);
	}
	
}

class Data{
	constructor(){
		this.tabs=[];
		this.body=[];
	}
	getTabs(){
		return({tabs:this.tabs})
	}
	getBody(){
		return({body:this.body})
	}
	addItems(tab,body){
		this.tabs=this.tabs.concat(tab);
		this.body=this.body.concat(body);
	}
	getObjects(){
		return({object:{
			tabs:this.tabs,body:this.body
		}});
		
	}
}
const test=new Data();
test.addItems([{href:"#tab1primary",name:"Primary 1",cls:"active"},{href:"#tab2primary",name:"Primary 2",cls:""},{href:"#tab3primary",name:"Primary 3",cls:""}],[{id:'tab1primary',name:'aman',cls:'tab-pane fade in active'},{id:'tab2primary',name:'mummy',cls:'tab-pane fade'},{id:'tab3primary',name:'annu',cls:'tab-pane fade'}]);

ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));