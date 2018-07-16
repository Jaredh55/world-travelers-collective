/* global Vue, VueRouter, axios */

var ChatroomsShowPage = {
  template: "#chatrooms-show-page",
  data: function() {
    return { 
      chatroom: {
        id: "",
        chats: "",
        users: ""
      },
      currentuser: {
        current_user: ""
      },
      newChat: {
        content: ""
      }
    };
  },
  created: function() {
    axios
      .get("/api/chatrooms/" + this.$route.params.id )
      .then(function(response) {
        this.chatroom = response.data;
      }.bind(this));
  },
  methods: {
    addChat: function() {
      var params = {
        content: this.newChat.content,
        chatroom_id: this.chatroom.id
      };
      var chatroomId = this.chatroom.id;
      axios
        .post("/api/chats", params)
        .then(function(response) {
          // router.push("/posts/" + postId);
          this.chatroom.chats = response.data.chats;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};

var UsersIndexPage = {
  template: "#users-index-page",
  data: function() {
    return {
      users: [],
      searchTerm: ""

    };
  },
  created: function() {
    axios
    .get("/users")
    .then(function(response) {
      this.users = response.data;
    }.bind(this));
  },
  methods: {
    searchUsers: function() {
      // var params = {
      //   search: search_term
      // };
      var searchTerm = this.searchTerm;
      axios
        .get("/users?search=" + searchTerm)
        .then(function(response) {
          this.users = response.data;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
  },
  computed: {}
};

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
      user_image_file_name: "",
      user_image_content_type: "",
      user_image_file_size: "",
      user_image_updated_at: "",
      newVisit: {
        city: "",
        country: "",
        start_date: "",
        end_date: ""
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
        start_date: this.newVisit.start_date,
        end_date: this.newVisit.end_date
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
    },
    uploadPic: function(event) {
      if (event.target.files.length > 0) {
        // var user_id = this.user.user_id;
        var formData = new FormData();
        // formData.append("email", this.user.email);
        // formData.append("bio", this.user.bio);

        formData.append("user_image", event.target.files[0]);

        axios
          .patch("/users/" + this.$route.params.id, formData)
          .then(function(response) {
            console.log(response);
            // this.user.email = "";
            // this.user.bio = "";
            event.target.value = "";
          });
      }
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
        points: "",
        chatrooms: ""
      },
      currentuser: {
        current_user: ""
      },
      newChatroom: {
        id: ""
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
    createChat: function() {
      var params = {
        receiver_id: this.user.user_id
      };

      axios
        .post("/api/chatrooms", params)
        .then(function(response) {
          this.newChatroom = response.data;
          router.push("/chatrooms/" + this.newChatroom.id);
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
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
      post_image_file_name: "",
      post_image_content_type: "",
      post_image_file_size: "",
      post_image_updated_at: "",
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
    },
    uploadPostPic: function(event) {
      if (event.target.files.length > 0) {
        var formData = new FormData();

        formData.append("post_image", event.target.files[0]);

        axios
          .patch("/api/posts/" + this.$route.params.id, formData)
          .then(function(response) {
            console.log(response);

            event.target.value = "";
          });
      }
    }
  },
  computed: {}
};

var PostsNewPage = {
  template: "#posts-new-page",
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
      post_image: null,
      storeEvent: {},
      errors: []
    };
  },
  created: function() {
    console.log('hello');
    // this.initMap();
  },
  methods: {
    map: function() {
      var map;
      var opts = { 'center': new google.maps.LatLng(41.89975948569213,-87.63608033178588), 'zoom': 7, 'mapTypeId': google.maps.MapTypeId.ROADMAP };
      map = new google.maps.Map(document.getElementById('map'), opts);

      google.maps.event.addListener(map,'click',function(event) {
        document.getElementById('latclicked').value = event.latLng.lat();
        this.latitude = document.getElementById('latclicked').value;
        document.getElementById('longclicked').value =  event.latLng.lng();
        this.longitude = document.getElementById('longclicked').value;
        var marker = new google.maps.Marker({
          position:{lat: parseFloat(this.latitude), lng: parseFloat(this.longitude)},
          map:map
        });

      }.bind(this));

      google.maps.event.addListener(map,'mousemove',function(event) {
        document.getElementById('latspan').value = event.latLng.lat();
        document.getElementById('lngspan').value = event.latLng.lng();
      });
    },

    storeFile: function(event) {
      if (event.target.files.length > 0) {
        this.post_image = event.target.files[0];
        this.storeEvent = event;
      }
    },
    submit: function() {
      if (this.post_image) {
        var formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("latitude", this.latitude);
        formData.append("longitude", this.longitude);
        formData.append("city", this.city);
        formData.append("tags", this.tags);

        formData.append("post_image", this.post_image);

        axios
          .post("/api/posts", formData)
          .then(function(response) {
            console.log(response);
            var postId = response.data.post_id;
            router.push("/posts/" + postId);
          })
          .catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
      } else {
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
            var postId = response.data.post_id;
            router.push("/posts/" + postId);
          })
          .catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
      }
    }  
  },
  computed: {},
  mounted: function() {
    console.log('hello there');
    // this.initMap();
    // this.myMap();
    this.map();

  }
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
        votecount: "",
        city: {name: ""},
        country: {name: ""},
        user: {id: 0}
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
        // if (this.post.latitude) {
        this.initMap();
        // }
      }.bind(this));
  },
  methods: {
    existsCoordinates: function() {
      if (this.post.latitude && this.post.longitude) {
        console.log('howdy');
        return true;
      }
    },
    initMap: function() {
      var map;
      var latitude = parseFloat(this.post.latitude);
      var longitude = parseFloat(this.post.longitude);
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 10
      });

      var marker = new google.maps.Marker({
        position:{lat: latitude, lng: longitude},
        map:map
      });
    },
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
    },
    deletePost: function() {
      var postId = this.post.post_id;
      router.push("/posts");

      axios
        .delete("/api/posts/" + postId);
    }

    //   axios
    //     .get("/api/posts/" + postId)
    //     .then(function(response) {
    //       this.post.comments = response.data.comments;
    //       // this.post.votecount = response.data.votecount;
    //       // router.push("/posts/" + postId);
    //     }.bind(this));

  },
  computed: {},
  mounted: function() {
    // console.log('hello');
    // this.initMap();

  }
};

var PostsIndexPage = {
  template: "#posts-index-page",
  data: function() {
    return {
      posts: [],
      cities: [],
      countries: [],
      tags: [],
      searchTerm: "",
      sort_attribute: "",
      sort_order: "",
      sortAttribute: "score",
      sortAscending: false,
      selected: ""
    };
  },
  created: function() {
    axios
      .get("/api/posts")
      .then(function(response) {
        this.posts = response.data.posts;
        this.countries = response.data.countries;
        this.cities = response.data.cities;
        this.tags = response.data.tags;
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
          this.posts = response.data.posts;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    goto(refName) {
      var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;
          
      window.scrollTo(0, top);
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
          this.posts = response.data.posts;
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

        console.log("Step 1");

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;

        console.log("Step 2");

        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user.id);

        this.$parent.current_user_id = response.data.user.id;
        this.$parent.current_user_chatmates = response.data.user.chatmates;
        // console.log(this.$parent.current_user_chatmates);
        
        router.push("/posts");
      }.bind(this))
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
    localStorage.removeItem("user_id");
    this.$parent.current_user_id = "";
    this.$parent.current_user_chatmates = "";

    router.push("/");
  }
};



var router = new VueRouter({
  routes: [
    { path: "/", component: PostsIndexPage },
    { path: "/signup", component: SignupPage},
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/posts", component: PostsIndexPage },
    { path: "/posts/new", component: PostsNewPage },
    { path: "/posts/:id", component: PostsShowPage },
    { path: "/posts/:id/edit", component: PostsEditPage },
    { path: "/users/:id", component: UsersShowPage },
    { path: "/users/:id/edit", component: UsersEditPage },
    { path: "/users", component: UsersIndexPage },
    { path: "/chatrooms/:id", component: ChatroomsShowPage}


  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  data: function() {
    return {
      current_user_id: "",
      current_user_chatmates: []
    };
  },
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }

    var userId = localStorage.getItem("user_id");
    if (userId) {
      axios
      .get("/users/" + userId)
      .then(function(response) {
        this.current_user_chatmates = response.data.chatmates;
      }.bind(this));
       
      this.current_user_id = userId;
    }
  }
});











