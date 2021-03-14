import React, { useState } from 'react'

//
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MarkerPage from './pages/MarkerPage';
import Feedback from './pages/Feedback';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContextPropProvieder } from './context/ContextProp';
import { AuthProvider } from './context/auth';


import SideBar from './components/SideBar';

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
        <ContextPropProvieder>
        <SideBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/register/" component={Register} />
            <Route exact path="/feedback/" component={Feedback} />
            <Route exact path="/marker/:markerId" component={MarkerPage} />
        </Switch>
        </ContextPropProvieder>
      </AuthProvider>
    </BrowserRouter>
  )
}
  
export default App;

/*
<div class="sixteen wide column" style={{ backgroundColor: "red", height: '10vw'}}>
<BottomBar />
</div>
*/

/*

        <Grid celled>

          <Grid.Row columns={2}>
            <Grid.Column>
              <SideBar />
            </Grid.Column>
            <Grid.Column>
              <KakaoMap />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <BottomBar />
            </Grid.Column>
          </Grid.Row>

        </Grid>
        */