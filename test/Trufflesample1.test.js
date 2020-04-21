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

}) 