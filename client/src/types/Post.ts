interface ILike {
    _id: string
    username: string
    createdAt: string
}


interface IPost {
    _id?: string
    likeCount?: number
    likes?: ILike[]
}

export default IPost;