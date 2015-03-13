<?php namespace PenCMS\Http\Controllers;

use PenCMS\DB\Models\Post;

class PostsController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
//		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
        $posts = Post::all();
		return view('home.index', compact('posts'));
	}

}
