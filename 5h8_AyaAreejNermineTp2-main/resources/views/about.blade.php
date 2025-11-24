@extends('layouts.app')
@section('title', __('about.title'))
@section('header', __('about.title'))

@section('content')
<div class="container mt-4">
  <h1 class="text-center" style="margin-bottom:18px">{{ __('about.title') }}</h1>

  <div class="card p-4" style="max-width:900px;margin:0 auto">
    <p>{!! __('about.student') !!}</p>
    <p>{{ __('about.course') }}</p>

    <h3 style="margin-top:18px">{{ __('about.howto_title') }}</h3>
    <ol>
      @foreach(__('about.howto') as $step)
        <li>{{ $step }}</li>
      @endforeach
    </ol>

    <h3 style="margin-top:18px">{{ __('about.db_title') }}</h3>
    <p class="text-muted">{{ __('about.db_hint') }}</p>
    @if(file_exists(public_path('images/db.png')))
      <img src="{{ asset('images/db.png') }}" alt="DB diagram" style="max-width:100%;border:1px solid #eee;border-radius:12px">
    @endif

    <h3 style="margin-top:18px">{{ __('about.inspo_title') }}</h3>
    <ul>
      @foreach(__('about.inspo') as $line)
        <li>{{ $line }}</li>
      @endforeach
    </ul>
  </div>
</div>
@endsection
