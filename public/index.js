/* global Vue, VueRouter, axios */

var UsersEditPage = {
  template: "#users-edit-page",
  data: function() {
    return { 
      user: {
        email: "",
        bio: "",
        user_id: "",
        visits: "",
        posts: "",
        points: ""
      },
      newVisit: {
        city: "",
        country: ""
      }
    };
  },
  created: function() {
    axios
      .get("/users/" + this.$route.params.id )
      .then(function(response) {
        this.user = response.data;
      }.bind(this));
  },
  methods: {
    submit: function() {
      var userId = this.user.user_id;
      var params = {
        id: this.user.user_id,
        email: this.user.email,
        bio: this.user.bio
      };
      axios
        .patch("/users/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/users/" + userId);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    addVisit: function() {
      var params = {
        city: this.newVisit.city,
        country: this.newVisit.country,
      };
      var user_id = this.user.user_id;


      axios
        .post("/api/visits", params)
        .then(function(response) {
          router.push("/users/" + user_id);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    removeVisit: function(visit) {
      var visit_id = visit.id;
      var user_id = this.user.user_id;

      axios
        .delete("/api/visits/" + visit_id)
        .then(function(response) {
          router.push("/users/" + user_id);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    } 
  },
  computed: {}
};

var UsersShowPage = {
  template: "#users-show-page",
  data: function() {
    return { 
      user: {
        email: "",
        bio: "",
        user_id: "",
        visits: "",
        posts: "",
        points: ""
      },
      currentuser: {
        current_user: ""
      }
    };
  },
  created: function() {
    axios
    .get("/users/" + this.$route.params.id )
    .then(function(response) {
      this.user = response.data;
    }.bind(this));
  },
  methods: {
    //   isCurrentUser: function(inputid) {
    //   return inputid === current_user;
    // },
  },
  computed: {}
};

var PostsEditPage = {
  template: "#posts-edit-page",
  data: function() {
    return { 
      post: {
        id: "",
        title: "",
        content: "",
        latitude: "",
        longitude: "",
        visit_id: "",
        city: "",
        tags: "",
        show_tags: ""
      },
      new_post: {
        edited_title: "",
        edited_content: "",
        edited_latitude: "",
        edited_longitude: "",
        edited_city: "",
        edited_tags: ""
      }
    };
  },
  created: function() {
    axios
    .get("/api/posts/" + this.$route.params.id )
    .then(function(response) {
      this.post = response.data;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var postId = this.post.post_id;
      var params = {
        id: this.post.post_id,
        title: this.post.title,
        content: this.post.content,
        latitude: this.post.latitude,
        longitude: this.post.longitude,
        city: this.post.city,
        tags: this.post.show_tags
      };
      axios
        .patch("/api/posts/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/posts/" + postId);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};

var PostsNewPage = {
  template: "#new-post",
  data: function() {
    return {
      id: "",
      title: "",
      content: "",
      latitude: "",
      longitude: "",
      visit_id: "",
      city: "",
      tags: "",
      post_image_file_name: "",
      post_image_content_type: "",
      post_image_file_size: "",
      post_image_updated_at: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        content: this.content,
        latitude: this.latitude,
        longitude: this.longitude,
        city: this.city,
        tags: this.tags

      };
      axios
        .post("/api/posts", params)
        .then(function(response) {
          router.push("/posts");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    uploadFile: function(event) {
      if (event.target.files.length > 0) {
        var formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("latitude", this.latitude);
        formData.append("longitude", this.longitude);
        formData.append("city", this.city);
        formData.append("tags", this.tags);

        formData.append("image", event.target.files[0]);

        axios
          .post("/api/posts", formData)
          .then(function(response) {
            console.log(response);
            this.title = "";
            this.body = "";
            event.target.value = "";
          });
      }
    }  
  },
  computed: {}
};

var PostsShowPage = {
  template: "#posts-show-page",
  data: function() {
    return { 
      post: {
        id: "",
        title: "",
        content: "",
        latitude: "",
        longitude: "",
        visit_id: "",
        post_image: "",
        created_at: "",
        updated_at: "",
        comments: [{votecount: "", score: "", id: ""}],
        score: "",
        votecount: ""
      },
      newVote: {
        votable_id: "",
        votable_type: "",
        positive: ""
      },
      newComment: {
        content: "",
        post_id: ""
      }
    };
  },
  created: function() {
    axios
      .get("/api/posts/" + this.$route.params.id )
      .then(function(response) {
        this.post = response.data;
      }.bind(this));
  },
  methods: {
    votePost: function(value) {
      var params = {
        votable_id: this.post.post_id,
        votable_type: "Post",
        positive: value
      };
      // var postId = this.post.post_id;
      axios
        .post("/api/votes", params)
        .then(function(response) {
          this.post.score = response.data.score;
          this.post.votecount = response.data.votecount;
          // router.push("/posts/" + postId);
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },

    removePostVote: function() {
      var postId = this.post.post_id;

      axios
        .delete("/api/votes/" + postId + "?votable_type=Post")
        .then(function(response) {
          router.push("/posts/" + postId);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
      axios
        .get("/api/posts/" + postId)
        .then(function(response) {
          this.post.score = response.data.score;
          this.post.votecount = response.data.votecount;
          // router.push("/posts/" + postId);
        }.bind(this));

    },
    voteComment: function(input_comment, positive) {
      var params = {
        votable_id: input_comment.id,
        votable_type: "Comment",
        positive: positive
      };
      var comment_id = input_comment.id;
      
      axios
        .post("/api/votes", params)
        .then(function(response) {
          this.post.comments = response.data.comments;
          // this.post.comments.score = response.data.score;
          // this.post.comment.votecount = response.data.votecount;
          // router.push("/posts/" + postId);
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    removeCommentVote: function(input_comment) {
      var comment_id = input_comment.id;
      var postId = this.post.post_id;

      axios
        .delete("/api/votes/" + comment_id + "?votable_type=Comment")
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
      axios
        .get("/api/posts/" + postId)
        .then(function(response) {
          this.post.comments = response.data.comments;
          // this.post.votecount = response.data.votecount;
          // router.push("/posts/" + postId);
        }.bind(this));
    },
    addComment: function() {
      var params = {
        content: this.newComment.content,
        post_id: this.post.post_id
      };
      var postId = this.post.post_id;
      axios
        .post("/api/comments", params)
        .then(function(response) {
          // router.push("/posts/" + postId);
          this.post.comments = response.data.comments;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deleteComment: function(input_comment) {
      var comment_id = input_comment.id;
      var postId = this.post.post_id;

      axios
        .delete("/api/comments/" + comment_id)
        .then(function(response) {
          router.push("/posts/" + postId);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
      axios
        .get("/api/posts/" + postId)
        .then(function(response) {
          this.post.comments = response.data.comments;
          // this.post.votecount = response.data.votecount;
          // router.push("/posts/" + postId);
        }.bind(this));
    }

  },
  computed: {}
};

var PostsIndexPage = {
  template: "#posts-index-page",
  data: function() {
    return {
      posts: [],
      searchTerm: "",
      sort_attribute: "",
      sort_order: "",
      sortAttribute: "created_at",
      sortAscending: true,
      selected: ""
    };
  },
  created: function() {
    axios
      .get("/api/posts")
      .then(function(response) {
        this.posts = response.data;
      }.bind(this));
  },
  methods: {
    searchPosts: function() {
      // var params = {
      //   search: search_term
      // };
      var searchTerm = this.searchTerm;
      axios
        .get("/api/posts?search=" + searchTerm)
        .then(function(response) {
          this.posts = response.data;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    sortPosts: function(order, attribute) {
      // var params = {
      //   sort_order: order,
      //   sort_by: attribute
      // };
      axios
        .get("/api/posts?sort_by=" + attribute + "&&sort_order=" + order)
        // .get("/api/posts", params)
        .then(function(response) {
          this.posts = response.data;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    setAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = true;
      }
          
      this.sortAttribute = inputAttribute;
    }
    // isValidPost: function(input_post) {
    //   var searchTerm = this.searchTerm;
    //   input_post.title.includes(searchTerm);
    // }
  },
  computed: {
    sortedPosts: function() {
      return this.posts.sort(function(post1, post2) {
        var lowerAttribute1 = String(post1[this.sortAttribute]).toLowerCase();
        var lowerAttribute2 = String(post2[this.sortAttribute]).toLowerCase();

        if (this.sortAscending) {
          return lowerAttribute1.localeCompare(lowerAttribute2);
        } else {
          return lowerAttribute2.localeCompare(lowerAttribute1);
        }

      }.bind(this));
    }
  }
};


var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};



var router = new VueRouter({
  routes: [
          { path: "/", component: HomePage },
          { path: "/signup", component: SignupPage},
          { path: "/login", component: LoginPage },
          { path: "/logout", component: LogoutPage },
          { path: "/posts", component: PostsIndexPage },
          { path: "/posts/new", component: PostsNewPage },
          { path: "/posts/:id", component: PostsShowPage },
          { path: "/posts/:id/edit", component: PostsEditPage },
          { path: "/users/:id", component: UsersShowPage },
          { path: "/users/:id/edit", component: UsersEditPage }

          ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});