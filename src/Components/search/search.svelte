
<script context="module">
    export async function load({fetch,params}) {
        
			const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e34b1cb04a474e9600a7d1c5ef07069f&language=en-US&query=${params.id}&page=1&include_adult=false`);

            const data=await res.json();
  
            console.log(data);
            if(res.ok){
                return {
                    props:{searchedMovie: data.results}
                };
            }		
    }
</script>