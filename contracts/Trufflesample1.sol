pragma solidity ^0.5.16;
// realisation of Todolist
contract Trufflesample1 {
  uint public taskCount = 0; //uint unsingned integer not negative

  struct Task {
  	//address addr;
  	//uint amount;
  	uint id; //task id
  	string content; //task to do
  	bool completed; //state of a task
  }
  
  mapping (uint => Task) public tasks; // associative array
  // tasks work as a database


  // creation of the event event element will be inside here
	event TaskCreated(
		uint id,
		string content,
		bool completed
	);


  constructor() public{
  	createTask("check out TodoList");
  }



  // put Task on mapping
  function createTask (string memory _content) public {
  	taskCount ++; // incrementer a chaque fois
  	tasks[taskCount]= Task(taskCount, _content, false);
  		// _content vient de l'application
  		// in tasks we have an assos array with those
  		// 3 elements
  
  		//********************************//
  		//creation of a task ///will send element to the event really
  		emit TaskCreated(taskCount, _content, false);
  }
  	
  
  
}