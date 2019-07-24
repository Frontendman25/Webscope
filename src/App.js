import React from 'react'
import { add } from 'ramda'
import { articles, authors, teams } from './data'

import './App.css'

class App extends React.Component {
  state = {
    counterForDoubleClick: 0,
    teamArticles: {
      name: '',
      articles: ''
    }
  }

  firstToUpper = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  test = () => {
    this.setState(state => {
      return { counterForDoubleClick: state.counterForDoubleClick + 1 }
    })
  }

  getTeamArticles = teamId => {
    const neededTeam = teams.find(item => item.id === teamId)
    const { members, name } = neededTeam

    const neededMembers = authors.filter(item => item.id === members[item.id - 1]) // [{id: 1, name: "Oliver"}, {id: 2, name: "Jan"} ...]
    const neededMembersNames = neededMembers.map(item => item.name) // ["Oliver", "Jan", "Jakub", "Peter"]
    const neededMembersIds = neededMembers.map(item => item.id) // [1,2,3,4]

    let string = ''
    let teamArticles = []
    let articlesData = []
    
    articles.map((item, index) => {
      if (articles[index].hasOwnProperty('authors')) {
        const articlesAuthors = neededMembersIds.filter(id => item.authors.indexOf(id) > -1) // [3], [1,2,3], ...

        articlesData.push(neededMembers.filter(member => articlesAuthors.indexOf(member.id) > -1))
         // [{id: 3, name: 'Jakub'}, ...]
        teamArticles.push(item.text)
        let currentText = teamArticles[index]

        articlesData.flat().map((man) => {
          man.text = currentText
        })

        // string = `${neededMembersNames[articlesData.length - 1]} wrote articles ${item.text}`
      }
    })
    console.log('articlesData - ', articlesData.flat())
  }

  render() {
    const { firstToUpper, test, getTeamArticles } = this
    getTeamArticles(1)

    return (
      <div className="container">
        <header className="header">
          <h1 className="header-title">Webscope interview test</h1>
        </header>
        <main className="main">
          <div className="tasks">
            <div className="task">
              <h2 className="task-caption">1. Implement firstToUpper method in Javascript that has a signature string → string:</h2>
              <h3 className="task-result">- {firstToUpper('first to upper method')}</h3>
            </div>

            <div className="task">
              <h2 className="task-caption">2. Visit http://jsbin.com/moruwihefe/edit?html,js,console,output , remove ondblclick handler and implement your own double click behavior without using ondblclick attribute:</h2>
              <button className="task-btn task-btn_result" onDoubleClick={test}>Test double click: {this.state.counterForDoubleClick}</button>
            </div>

            <div className="task">
              <h2 className="task-caption">3. Implement add method which will work like this:</h2>
              <h3 className="task-result">coolAdd(3, 4) ~> 7<br />
                - {add(3, 4)}</h3>
              <h3 className="task-result">coolAdd(3)(4) ~> 7<br />
                - {add(3)(4)}</h3>
            </div>

            <div className="task">
              <h2 className="task-caption">4. Implement function getTeamArticlesDescription(teamId: number) : string {}:</h2>
              <h3 className="task-result">

              </h3>
              <h3 className="task-result">

              </h3>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

// function App() {
//   const text = this.props
//   console.log(text)
//   return (
//     <div className="container">
//       <header className="header">
//         <h1>Webscope interview test</h1>
//         <h2>1. Implement firstToUpper method in Javascript that has a signature string → string</h2>
//         <div className="">{firstToUpper()}</div>
//       </header>
//     </div>
//   );
// }

export default App;
