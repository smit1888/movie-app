const app = {
    active :"home",
    // theData:null,
    init: ()=>{
        
        let button = document.querySelector("button");
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.pop);  
        button.addEventListener("click",app.clicked);
        
    },
    
    
    clicked:(ev)=>{
        ev.preventDefault();
        
        let second_page = document.getElementById('actors');
        while(second_page.firstChild){
            second_page.removeChild(second_page.firstChild);
        }

        
        
        document.getElementById("home").classList.remove('active');
        second_page.classList.add('active');

        
        
       
        let search = document.getElementById("search").value;
        
        let url = `https://api.themoviedb.org/3/search/person?api_key=7702605e9b7274d151568f57e49005a6&language=en-US&query=${search}&include_adult=false`;

        fetch(url)
        .then(result=>{
            
            return result.json();
            
        })
        .then(data=>{
            // app.theData = data;
            console.log(data);
            let FAB = document.createElement("img");
                FAB.setAttribute("src","search.svg");
                FAB.setAttribute("class","FAB");
                FAB.setAttribute("alt","dummy-icon.png");
                FAB.addEventListener("click",ev=>{
                    history.go(-1);
                });
                

            data.results.forEach(array=>{
                
                

                let text= array.name;
                let box=document.createElement("p");
                box.setAttribute("class","box")

                    if(array.profile_path==null){
                    let profile_path = "dummy-icon.png";
                    let p_img=document.createElement("img");
                    let br = document.createElement("br");
                    p_img.setAttribute("src",profile_path);
                    p_img.style.height="250px";
                    p_img.style.width="185px";
                    p_img.setAttribute("alt","dummy-icon");
                    
                    box.appendChild(p_img);
                    p_img.insertAdjacentElement("afterend",br);
                }else{
                    let profile_path = `https://image.tmdb.org/t/p/w185${array.profile_path}`;
                    let p_img=document.createElement("img");
                    let br = document.createElement("br");
                    p_img.setAttribute("src",profile_path);
                    p_img.setAttribute("alt","icon");
                    box.appendChild(p_img); 
                    p_img.insertAdjacentElement("afterend",br);
                  }
              
                let link = document.createElement("a");
                 
                
                link.textContent =text; 
                
               
                
                link.addEventListener("click",function(ev){
                    
                    let third_page = document.getElementById('movies');
                    let FAB2 = document.createElement("img");
                FAB2.setAttribute("src","search.svg");
                FAB2.setAttribute("class","FAB");
                FAB.setAttribute("alt","dummy-icon.png");
                FAB2.addEventListener("click",ev=>{
                    history.go(-2);
                });
                third_page.appendChild(FAB2);
                    let header= document.createElement("h1");
                    header.textContent = text;
                    console.log(header);
                    third_page.appendChild(header);

                    if(ev.target.textContent ==text){
                        
                        let known = array.known_for;
                        known.forEach(element=>{
                            
                            let p_p=document.createElement("img");
                            let brt=document.createElement("br");
                            let ancor = document.createElement("a");
                            let br1 =document.createElement("br");
                            let p_src=`https://image.tmdb.org/t/p/w185${element.poster_path}`;
                            p_p.setAttribute("src",p_src);
                            ancor.textContent = (element.original_title || element.title || element.original_name);
                            third_page.appendChild(p_p);
                            third_page.appendChild(brt); 
                            third_page.appendChild(ancor);
                            ancor.appendChild(br1);

                            document.getElementById("actors").classList.remove('active');
                            third_page.classList.add('active');
                            
                            
                            
                            let movieID = element.id;
                            
                            ancor.addEventListener("click",function(ev)
                            
                            {
                                
                                let urlsecond = `https://api.themoviedb.org/3/movie/${movieID}?api_key=7702605e9b7274d151568f57e49005a6&language=en-US`;
                                
                                fetch(urlsecond)
                                .then(name=>{
                                    return name.json();
                                })
                                .then(names=>{
                                    console.log(names);
                                    history.pushState({}, movies, `#movie`);
                                    let castid= names.id;
                                    let moviecast = `https://api.themoviedb.org/3/movie/${castid}/credits?api_key=7702605e9b7274d151568f57e49005a6`;
                                    fetch(moviecast)
                                    .then(cast=>{
                                        return cast.json();
                                    })
                                    .then(casts=>{
                                        console.log(casts);
                                        let ca=document.createElement("p");
                                        ca.textContent="Casts:"; 
                                        fourth_page.appendChild(ca);
                                        casts.cast.forEach(person=>{
                                            let castname= document.createElement("p");
                                            castname.setAttribute("class","cast");
                                            castname.textContent=person.name;
                                            fourth_page.appendChild(castname);
                                            if(person.profile_path==null){
                                                let c_img=document.createElement("img");
                                                c_profile=`dummy-icon.png`;
                                                c_img.setAttribute("src",c_profile);
                                                c_img.setAttribute("alt","image is not available");
                                                c_img.style.height="250px";
                                                c_img.style.width="185px";
                                                let br3=document.createElement("br");
                                                castname.appendChild(br3);
                                                castname.appendChild(c_img); 
                                            }
                                            else{
                                            let c_img=document.createElement("img");
                                            c_profile=`https://image.tmdb.org/t/p/w185${person.profile_path}`;
                                            c_img.setAttribute("src",c_profile);
                                            c_img.setAttribute("alt","image is not available");
                                            c_img.style.height="250px";
                                            c_img.style.width="185px";
                                            let br3=document.createElement("br");
                                            castname.appendChild(br3);
                                            castname.appendChild(c_img);
                                            }
                                        })
                                    })
                                    let fourth_page =document.getElementById("movie");
                                    let FAB3 = document.createElement("img");
                                    FAB3.setAttribute("src","search.svg");
                                    FAB3.setAttribute("class","FAB");
                                    FAB.setAttribute("alt","image is not available");
                                    FAB3.addEventListener("click",ev=>{
                                        history.go(-3);
                                    });
                                    fourth_page.appendChild(FAB3);
                                    
                                    let m_image = document.createElement("img");
                                    
                                    m_image.src = "https://image.tmdb.org/t/p/w342"+names.poster_path;
                                    m_image.setAttribute("alt","image is not available");
                                    
                                    let m_title = document.createElement("p");
                                    m_title.textContent = "Title: " +names.title;
                                    let m_release =document.createElement("p");
                                    m_release.textContent="Release Date: "+names.release_date;
                                    
                                    let m_genre =document.createElement("p");
                                    
                                     names.genres.forEach(genre=>{
                                         let gen = document.createElement("p");
                                         gen.textContent = "Genre:"+genre.name;
                                         m_genre.appendChild(gen); 

                                     })
                                    
                                    fourth_page.appendChild(m_image);
                                    fourth_page.appendChild(m_title);
                                    fourth_page.appendChild(m_release);
                                    fourth_page.appendChild(m_genre);
                                    
                                    document.getElementById("movies").classList.remove('active');
                                    fourth_page.classList.add('active');
                                    
                                })
                                .catch(error=>{
                                    alert("The resource you requested could not be found.");
                                })
                                 
                            })
                            
                        }) 
                                          
                    }
                    history.pushState({}, movies, `#movies`);
                    
                });
                second_page.appendChild(FAB);
                second_page.appendChild(box);
                box.appendChild(link);
                
                
                
            })
            history.pushState({}, actors, `#actors`);
            
            
        })
        
        .catch(err=>{
            alert("The resource you requested could not be found.");
        })

        
    },
    pop: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        if(location.hash=="#actors"){app.deletethird();}
        else if(location.hash=="#movies"){app.deletefourth();}
        

    },
    deletethird:(ev)=>{

        let third= document.getElementById("movies");
        third.innerHTML=""
     },
     deletefourth:(ev)=>{
         let fourth= document.getElementById("movie");
         fourth.innerHTML=""
     }
    

   
}      
document.addEventListener("DOMContentLoaded",app.init);