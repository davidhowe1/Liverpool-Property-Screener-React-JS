import React from 'react'
import { BookmarkXFill, BookmarkCheckFill } from 'react-bootstrap-icons'

export default function BookmarkAlert({ bookmarkAlert, bookmarkExistsAlerty }) {
  return (
    <>
    <div className={bookmarkAlert ? 'bookmark-alert' : 'bookmark-alert hidden'}>
        <div><BookmarkXFill /></div>
        You have added a new Bookmark.
    </div>

    <div className={bookmarkExistsAlerty ? 'bookmark-exists-alert' : 'bookmark-exists-alert hidden'}>
        <div><BookmarkCheckFill /></div>
        You have already bookmarked this property.
    </div>
    </>
  )
}
