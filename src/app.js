App = {
	loading: false, //prevent double loading of rending
	//empty objcet which content the contract as a js file
	contracts: {},

	load: async() =>{
		//load app ...
		await App.loadWeb3()
		await App.loadAccount() //appel a la fonction qui affiche le compte connecte
		await App.loadContract() // appel JSON file Trufflesample1
		await App.render() // rendu visuel
	},

 // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

 loadAccount: async ()=>{
 	//exposer le compte qui contient les ethers
 	App.account = web3.eth.accounts[0]
 	console.log(App.account)
 },

 loadContract: async ()=>{
 	const trufflesample = await $.getJSON('Trufflesample1.json')
 	//truffle contract javascript representation of the contract where we can call fonction
 	App.contracts.Trufflesample1=TruffleContract(trufflesample)
 	App.contracts.Trufflesample1.setProvider(App.web3Provider)
 	console.log(trufflesample)

 	// copy of the smart contrat deployed in the Blockchain
 	// with value comming from Blockchain
 	App.trufflesample = await App.contracts.Trufflesample1.deployed()
 },

render: async()=>{
	//Prevent double render
	if(App.loading){
		return
	}
	// update app loading state
	App.setLoading(true)

	//Render account show account
	$('#account').html(App.account)

	//Render Account affiche les task qui sont dans la blockchain
	await App.renderTasks()

	// update app loading state
	App.setLoading(false)
},


renderTasks: async ()=>{
	//load the total task count from the Blockchain
	const taskCount= await App.trufflesample.taskCount()
	const $taskTemplate = $('.taskTemplate')
	
	//render out each task with a new task template
	for (var i = 1; i <= taskCount; i++) {
		//Fetch the task data from the blockchain
		// with the struct Task from Trufflesample1
		const task = await App.trufflesample.tasks(i)
		const taskId = task[0].toNumber()
		const taskContent = task[1]
		const taskCompleted = task[2]
	
		// Create the html for the task
      	const $newTaskTemplate = $taskTemplate.clone()
      	$newTaskTemplate.find('.content').html(taskContent)
      	$newTaskTemplate.find('input')
                        .prop('name', taskId)
                        .prop('checked', taskCompleted)
                       // .on('click', App.toggleCompleted)

        // Put the task in the correct list completed and incompleted
	      if (taskCompleted) {
	        $('#completedTaskList').append($newTaskTemplate)
	      } else {
	        $('#taskList').append($newTaskTemplate)
	      }


	      //show the task
	      $newTaskTemplate.show()
	}

	


},






setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }

//fin
}

	$(()=>{
		$(window).load(()=>{
			App.load()
		})
	})

