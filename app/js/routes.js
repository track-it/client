const home = {
  url: '/',
  controller: 'HomeCtrl as homeCtrl',
  templateUrl: 'home.html',
  title: 'Home'
};

const login = {
  guest: true,

  url: '/login',
  controller: 'LoginCtrl as loginCtrl',
  templateUrl: 'auth/login.html',
  title: 'Login'
};

const proposals = {
  url: '/proposals',
  controller: 'ProposalsCtrl as proposalCtrl',
  templateUrl: 'proposals/index.html',
  title: 'Proposals',
  resolve: {
    proposals: function (ProposalService) {
      return ProposalService.index();
    }
  }
};

const showProposal = {
  url: '/proposals/:id',
  controller: 'ProposalCtrl as proposalCtrl',
  templateUrl: 'proposals/show.html',
  title: 'Proposal',
  resolve: {
    proposal: function (ProposalService, $stateParams) {
      return ProposalService.get($stateParams.id);
    }
  }
};

const createProposal = {
  authenticate: false, //true,

  url: '/proposals/create',
  controller: 'CreateProposalCtrl as proposalCtrl',
  templateUrl: 'proposals/create.html',
  title: 'Proposal'
};

const projects = {
  url: '/projects',
  controller: 'ProjectsCtrl as projectCtrl',
  templateUrl: 'projects/index.html',
  title: 'Projects',
  resolve: {
    proposals: function (ProjectService) {
      return ProjectService.index();
    }
  }
};

export default {
  setup: function ($stateProvider) {
    $stateProvider
      .state('home', home)
      .state('login', login)
      .state('proposals', proposals)
      .state('createProposal', createProposal)
      .state('showProposal', showProposal)
      .state('projects', projects);
  }
};
