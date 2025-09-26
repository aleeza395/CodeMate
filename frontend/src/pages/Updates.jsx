import React, { useEffect, useState } from 'react'
import axios from 'axios'
import updateStyles from './Updates.module.css'
import Header from '../components/Header'

const Updates = () => {
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/updates')
        setUpdates(data.articles || [])
      } catch (error) {
        console.error('Error fetching updates:', error)
      }
    }
    fetchUpdates()
  }, [])

  return (
    <>
    <Header />
    <div className={updateStyles.updatesContainer}>
      <h1 className={updateStyles.heading}>Latest Tech Updates</h1>
      <div className={updateStyles.updatesList}>
        {updates.map((article, index) => (
          <div key={index} className={updateStyles.updateCard}>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className={updateStyles.updateImage}
              />
            )}
            <div className={updateStyles.updateContent}>
              <h2 className={updateStyles.updateTitle}>{article.title}</h2>
              <p className={updateStyles.updateDescription}>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={updateStyles.updateLink}
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Updates
