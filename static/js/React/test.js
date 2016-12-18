class ParentContainer extends React.Component{
	constructor(props){
		super(props);
		this.holder=this.holder.bind(this);
		this.state=props.data.object;
	}
	holder(){
		return(
	            <div className="panel with-nav-tabs panel-primary">
	            	<NavTabs tabs={this.props.data.object.tabs}/>
	            
	            <div className="panel-body">
	                <TabBody body={this.props.data.object.body}/>
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
		//this.remove=this.remove.bind(this);
		
		
	}
	

	tab(props){
		return(
			<li className={props.cls}><a href={props.href} data-toggle="tab">{props.name}<img onClick={() => remove(props.id)}/></a></li>	
		);
	}
	tabList(props){
		const listItems = this.props.tabs.map((item) =>
		<this.tab cls={item.cls} href={item.href} name={item.name} key={item.key} id={item.key}/>
		
		);
		return(<ul className="nav nav-tabs">
			{listItems}
			<li><img className="add-more" onClick={addTab}/></li>
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
class TabBodyUpload extends React.Component{
	constructor(props){
		super(props);
		this.upload_area=this.upload_area.bind(this);
	}
	upload_area(props){
		return(<div id={props.upload} className="dropzone" ></div>);
	}
	componentDidMount() {
	      
	      if (document.getElementById(this.props.upload_id)) {
	    	  console.log('div#'+this.props.upload_id);
	    	  var myDropzone = new Dropzone('div#'+this.props.upload_id, {url:"/createitem/upload/",uploadMultiple:"false",
	    		  paramName: "file"+this.props.upload_id, // The name that will be used to transfer the file
	    		  maxFilesize: 24,
	    		  maxFiles: 1,
	    		  addRemoveLinks:true,
	    		  init: function() {
	    		      this.on("maxfilesexceeded", function(file) {
	    					alert('one file per tab');
	    		            this.removeAllFiles();
	    		            this.addFile(file);
	    		      });},
	    		  accept: function(file, done) {
	    		    if (file.name == "justinbieber.jpg") {
	    		      done("Naha, you don't.");
	    		    }
	    		    else { done(); }
	    		  }
	    		});
	    	  // other code here
	    	}
	}
	render(){
		return(<this.upload_area upload={this.props.upload_id}/>);
	}
}
class BodyTabs extends React.Component{
	constructor(props){
		super(props);
		this.showTab=this.showTab.bind(this);
	}
	componentDidMount(){
		this.showTab(this.props.data.tabs.tab_keys[0]);
	}
	showTab(id,cls){
		if (document.getElementsByClassName(cls)){
			var x = document.getElementsByClassName(cls);
			for (var i = 0; i < x.length; i++) {
				x[i].style.display = "none";  
			}
			document.getElementById(id).style.display = "block";
		}
	}
	render(){return(
	    <section>
			<div className="tabs tabs-style-bar">
				<nav>
					<ul>
					  <li><a href="javascript:void(0)" onClick={(e) => this.showTab(this.props.data.tabs.tab_keys[0],this.props.data.tabs.tab_keys[3])}>Upload</a></li>
					  <li><a href="javascript:void(0)" onClick={(e) => this.showTab(this.props.data.tabs.tab_keys[1],this.props.data.tabs.tab_keys[3])}>Page</a></li>
					  <li><a href="javascript:void(0)" onClick={(e) => this.showTab(this.props.data.tabs.tab_keys[2],this.props.data.tabs.tab_keys[3])}>Review</a></li>
					</ul>
				</nav>
				<div className="content-wrap">
					<section id={this.props.data.tabs.tab_keys[0]} className={this.props.data.tabs.tab_keys[3]}><TabBodyUpload upload_id={this.props.data.body.uplaod}/></section>
					<section id={this.props.data.tabs.tab_keys[1]} className={this.props.data.tabs.tab_keys[3]}><p>2</p></section>
					<section id={this.props.data.tabs.tab_keys[2]} className={this.props.data.tabs.tab_keys[3]}><p>3</p></section>
				</div>
			</div>
		</section>
	
		
	)}
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
		const body= this.props.body.map((item) =>
		<div className={item.cls} id={item.id} key={item.key}><BodyTabs data={item.body}/></div>
		
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
		this.keys=[];
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
	getKeys(){
		return this.keys;
	}
	addKey(){
		while(true){
			var randomnumber = Math.floor((Math.random() * 100000) + 1);
		    if(this.keys.indexOf(randomnumber) > -1) continue;
		    break;
		}
		this.keys=this.keys.concat(randomnumber);
		return randomnumber;
	}
	deleteItem(id){
		var match;
		var loop = this.tabs.map(function(num) {
			  if (num.key==id){
				  match=num;
				  return num;
			  }
			});
		console.log(this.tabs.indexOf(match));
		var index=this.tabs.indexOf(match);
		this.tabs.splice(index, 1);
		this.body.splice(index, 1);
		this.keys.splice(index, 1);
	}
	
}
const test=new Data();
function addTab(){
	var key=test.addKey();
	var bodytabs={'tab_keys':['upload_tab_'+key,'paper_tab_'+key,'review_tab_'+key,'sub-tab_'+key]};
	var bodybody={uplaod:'upload-'+key};
	var tabbody={tabs:bodytabs,body:bodybody};
	
	if (test.getKeys().length>1){
		for(var i=0;i<=test.body.length-1;i++){
			test.body[i].cls='tab-pane fade';
			test.tabs[i].cls='';

		}
		
		test.addItems([{href:"#tab"+key+"primary",name:"Primary "+key,cls:"active",'key':key}],[{id:'tab'+key+'primary',name:'aman',cls:'tab-pane fade active in','key':key,'body':tabbody}]);
		console.log(test.tabs);
		
	}
	else{
		test.addItems([{href:"#tab"+key+"primary",name:"Primary "+key,cls:"active",'key':key}],[{id:'tab'+key+'primary',name:'aman',cls:'tab-pane fade active in','key':key,'body':tabbody}]);
	}
	
	ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));
	
	
}
function remove(e){
	test.deleteItem(e);
	if(test.getKeys().length>0){
		test.body[test.body.length-1].cls='tab-pane fade active in';
		test.tabs[test.tabs.length-1].cls='active';
	}
	
	
	ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));
}
//test.addItems([{href:"#tab1primary",name:"Primary 1",cls:"active"},{href:"#tab2primary",name:"Primary 2",cls:""},{href:"#tab3primary",name:"Primary 3",cls:""}],[{id:'tab1primary',name:'aman',cls:'tab-pane fade in active'},{id:'tab2primary',name:'mummy',cls:'tab-pane fade'},{id:'tab3primary',name:'annu',cls:'tab-pane fade'}]);
Dropzone.autoDiscover = false;
ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));