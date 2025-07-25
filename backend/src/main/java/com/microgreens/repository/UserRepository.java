import com.microgreens.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u LEFT JOIN Order o ON o.user.id = u.id GROUP BY u.id ORDER BY COUNT(o.id) DESC")
    List<User> findTop5ByOrderByOrdersDesc();
}