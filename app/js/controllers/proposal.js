function ProposalCtrl(ProposalService, CommentService, StorageService, UserService, TeamService, AppSettings, $state, $scope, proposal, comments) {
  'ngInject';

  const config = AppSettings;
  const storage = StorageService;
  const vm = this;

  vm.proposal = proposal;
  vm.comments = comments;
  vm.students = [];
  vm.title = proposal.title;
  vm.config = config;

  vm.user = window.user;

  vm.token = storage.get('api_token');

  vm.comment = {};
  vm.team = [];

  vm.postComment = () => {
    CommentService.store('proposals', vm.proposal.id, vm.comment.body)
      .then(res => {
        vm.comments.push(res.data.data);
        vm.comment.body = '';
      });
  };

  vm.isCommentable = () => {
    return (proposal.author_id == vm.user.id || vm.user.role_id > config.PROJECT_ROLES.STUDENT);
  };

  vm.studentCanApply = () => {
    return (vm.user.role_id == config.ROLES.STUDENT
      && !vm.team.users
      && vm.proposal.status == config.PROPOSAL_STATUSES.APPROVED);
  }

  vm.memberCount = () => {
    let indices = [];
    for (var i = 0; i < vm.team.length + 1; i++) {
      indices.push(i);
    }
    return indices;
  }

  vm.sendApplication = () => {
    TeamService.store(vm.proposal.id, {
      'user_ids': vm.team
    }).then(team => {
      $state.go($state.current, {}, {reload: true});
    });
  }

  if (vm.user.role_id == config.ROLES.STUDENT) {
    UserService.index({'role': 'student'})
      .then(students => {
        vm.students = students;
      });

    TeamService.index(vm.proposal.id, {
      'user_id': vm.user.id
    }).then(teams => {
      if (teams.length == 1)
        vm.team = teams[0];
    });
  }

}

export default {
  name: 'ProposalCtrl',
  fn: ProposalCtrl
};
