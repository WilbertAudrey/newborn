<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBabiesTable extends Migration
{
    public function up()
    {
        Schema::create('babies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mom_id');
            $table->enum('gender', ['L', 'P']);
            $table->date('birth_date');
            $table->integer('pregnancy_age');
            $table->decimal('height', 5, 2);
            $table->decimal('weight', 5, 2);
            $table->string('description')->nullable();
            $table->enum('infant_condition', ['Alive', 'Death', 'Disabled']);
            $table->enum('birth_process', ['Normal', 'Caesar', 'Waterbirth', 'others']);
            $table->timestamps();

            $table->foreign('mom_id')->references('id')->on('moms')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('babies');
    }
}
