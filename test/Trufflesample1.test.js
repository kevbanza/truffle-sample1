const Trufflesample1 = artifacts.require("./Trufflesample1.sol")

contract('Trufflesample1', (accounts)=>{
	before(async()=>{
		this.trufflesample = await Trufflesample1.deployed()
	})
 
	it('deploys successfully', async()=>{
		const address = await this.trufflesample.address
		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})


	it('lists tasks', async()=>{
		const taskCount = await this.trufflesample.taskCount()
		const task = await this.trufflesample.tasks(taskCount)
		assert.equal(task.id.toNumber(), taskCount.toNumber())
		assert.equal(task.content, 'check out TodoList')
		assert.equal(task.completed, false)
		assert.equal(taskCount.toNumber(), 1)
	})



	//test of task creation

	it('creates tasks', async()=>{
		const result = await this.trufflesample.createTask('A new task')
		const taskCount = await this.trufflesample.taskCount()
		assert.equal(taskCount, 2)
		//console.log(result)
		const event = result.logs[0].args   //args content all elements of the event taskcreated
		assert.equal(event.id.toNumber(), 2)
		assert.equal(event.content, 'A new task')
		assert.equal(event.completed, false)
	})


}) 