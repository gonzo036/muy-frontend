<template>
	<header>
		<nav>
			<div class="nav_icon ">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div>
				<a href="/">
					<img src="../assets/images/logo.png" class="header_logo" />
				</a>
				<ul>
					<li>
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/register">Register</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		props: {

		}
	}
</script>
