App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    //check to see if there is an injected web3 instance!
    if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
    }
    else
    {
        //if there is no injected web3 instance detected, fallback to the TestRPC
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data){
    // here we are going to get the necessary contract artifact file and instantiate it with truffle-contract
    // truffle-contract is a truffle library that keeps information about the contract insync with migrations
        var AdoptionArtifact = data;
        // here we are telling our App, in the list of contracts specifically the adoption one
        // that we are setting = to a new trufflecontract with the artifact we just loaded
        App.contracts.Adoption = TruffleContract(AdoptionArtifact);

        //now we set the provider for our contract
        App.contracts.Adoption.setProvider(App.web3Provider);

        //use our new contract to retrieve and mark the adopted pets
        return App.markAdopted();
    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
        for (i = 0; i < adopters.length; i++) {
            if(adopters[i] !== '0x0000000000000000000000000000000000000000') {
                $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
            }
        }
    }).catch(function(err) {
        console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts) {
        if(error) {
            console.log(error);
        }

        var account = accounts[0];

        App.contracts.Adoption.deployed().then(function(instance) {
            adoptionInstance = instance;
            //execute adopt as a transaction by sending account
            return adoptionInstance.adopt(petId, {from: account});
        }).then(function(result) {
            return  App.markAdopted();
        }).catch(function(err) {
            console.log(err.message);
        });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
