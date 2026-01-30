
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'X-Requested-With': 'XMLHttpRequest'
};

headers['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").content;





class Api {
    saveUser(user) {
        const dataToSubmit = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password
            
        }

        if (user.hasValidId()) {
          return patch("/user/" + user.get("id") + ".json", dataToSubmit);
        } else {
          return post("/users.json", dataToSubmit);
        }

    }

    logout() {
      return get("/logout.json");
    }

    
    updatePassword(request) {
      const data = request.params();
      
      return patch("/password.json", data);
      
    }
    
    sendPasswordReset(email) {
      return post("/password.json", {email})
    }
    
    graphQL(data) {
      return post("/graphql", data);
    }
}

function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: headers,
        credentials: 'same-origin',
        cache: 'default'
    }).then(res => res.json());
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify(data),
        cache: 'default'
    }).then(res => res.json());
}

function patch(url, data) {
    data = data || {};
    data._method = "PATCH";
    return fetch(url, {
        method: 'PATCH',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify(data),
        cache: 'default'
    }).then(res => res.json());
}




const instance = new Api();

export default instance;
