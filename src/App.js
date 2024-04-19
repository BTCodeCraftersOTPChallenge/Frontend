import './App.css';
import React, {useEffect, useState} from 'react'
import HomeContainer from './home/home-container'
import ErrorPage from './commons/errorhandling/error-page';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// export const AppContext = React.createContext(true);

function App() {

  return (
            <div className="App">
              <Router>
                  <div>
                      <Switch>
                          {/* Home Page: */}
                          <Route
                              exact
                              path='/'
                              render={() =>
                                  <div>
                                      <HomeContainer/>
                                  </div>
                              }/>

                          {/*Error Page:  */}
                          <Route
                              exact
                              path='/error'
                              render={() => <ErrorPage/>}
                          />
                          <Route render={() =><ErrorPage/>} />
                      </Switch>
                  </div>
              </Router>
            </div>)
}

export default App;