<script setup>
    defineProps({
        arrayInformation: Array,
    })
</script>

<template>
    
<table class="table">
	<thead>
		<tr>
			<th>Точка</th>
			<th>Дата</th>
			<th>Кол. Часов</th>
			<th>СТ/Ч</th>
			<th>ЗП</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="a in arrayInformation" :key="a.id">
			<td>{{ a.place_name }}</td>
			<td>{{a.work_date}}</td>
			<td>{{a.total_hours_worked * 60}} м</td>
			<td>{{ a.rubles }} руб/ч</td>
			<td> руб</td>

		</tr>
	</tbody>
</table>

</template>
<style>
.table {
	width: 100%;
	margin-bottom: 20px;
	border: 1px solid var(--btn-color);
	border-collapse: collapse; 
    border-radius: 10px;
    color: white;
    font-size: 14px;
}
.table th {
	font-weight: bold;
	padding: 5px;
    color: black;
	background: var(--btn-color);
	border: 1px solid var(--btn-color);
}
.table td {
	border: 1px solid var(--btn-color);
	padding: 5px;
	text-align: center;
}

</style>