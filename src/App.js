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



  // const neededMembers = authors.filter(item => item.id === members[item.id - 1])


  getTeamArticles = teamId => {
    const neededTeam = teams.find(item => item.id === teamId)
    const { members, name } = neededTeam
    console.log('member - ', members)
    // const neededMembers = authors.filter(item => item.id === members[item.id - 1]) // [{id: 1, name: "Oliver"}, {id: 2, name: "Jan"} ...]
    const neededMembers = authors.filter(item => item.id === members.find(id => id === item.id))

    // console.log('authors[1].id - ', authors[1].)

    console.log('neededMembers - ', neededMembers)
    console.log('authors - ', authors)

    neededMembers.forEach(user => user.text = '')

    let articlesLenght

    members.forEach((member, index) => {
      // debugger
      articles.forEach((article) => {
        // if (article.authors && article.authors.includes(member) && neededMembers[index]) {
        if (article.authors && article.authors.includes(member)) {
          articlesLenght = articles.length
          // neededMembers[index].text += article.text + ', '
          neededMembers.forEach(id => id.text += article.text + ', ')
        }
      })
    })

    neededMembers.forEach(user => {
      return user.text.replace(/..$/, "")
    })

    const insertAnd = (el) => {
      let restElLength = el.length - 2

      if (el.length > 1) {
        return `${el[0]}, ${el[1]} and ${el.length > 2 ? restElLength + ' more' : ''}`
      } else {
        return el
      }
    }

    const output = neededMembers.map((element, index) => {
      let finalHtml
      let text = element.text.replace(/..$/, "").split(', ')

      const work = `${element.name} ${element.text ? `wrote articles ${insertAnd(text)}` : 'wrote 0  articles'}`
      const result = `Team ${name} co-authored ${neededMembers.length} out of ${articlesLenght} articles.`

      if (index === neededMembers.length - 1) {
        finalHtml = <div key={index}>
          <p>-----</p>
          <p className="result">{index === neededMembers.length - 1 ? result : ''}</p>
        </div>

      } else {
        finalHtml = <div key={index}>
          <p className="info">{work}</p>
        </div>
      }

      return finalHtml
    })

    return output
  }

  render() {
    const { firstToUpper, test, getTeamArticles } = this

    return (
      <div className="container" >
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
                {getTeamArticles(1)}
              </h3>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App;
