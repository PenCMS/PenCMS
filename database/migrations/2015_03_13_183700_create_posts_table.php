<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('posts', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('slug')->unique();
            $table->string('title');
            $table->integer('category_id')->nullable();
            $table->text('content');
            $table->text('content_parsed');
			$table->timestamps();
			$table->softDeletes();
            $table->timestamp('published_date')->nullable();
            $table->json('options')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('posts');
	}

}
